let loginUser,
    loginRoomId,
    loginUserId,
    start = 0,
    //消息回调，从onMessage方法传入参数
    messageCallback,
    isSocketOpen = false,
    packets = {
        open: 0 // non-ws
            ,
        close: 1 // non-ws
            ,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    },
    events = {
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6
    },
    socketid = '',
    heartBeatInterval = null;

/*socket start*/
function connectSocket(roomId, user, callback) {
    loginUser = user;
    loginRoomId = roomId;
    loginUserId = user[2];

    wx.connectSocket({
        url: 'wss://chat.polyv.net/socket.io/?EIO=3&transport=websocket&token=weixin', //真机不能使用端口号，因为默认监听443端口
        method: 'GET',
        success: function(res) {
            console.log('connect success: ', res);
        },
        fail: function(err) {
            console.log('connect error: ', err);
        }
    })

    messageCallback('LOGIN');

    if (typeof callback == 'function') {
        callback();
    }
}

function createHeartBeat(){
   //心跳机制
    if (heartBeatInterval) {
        clearInterval(heartBeatInterval);
    }

    heartBeatInterval = setInterval(function() {
        heartBeat();
    }, 50 * 1000);
}

//心跳
function heartBeat() {
    var data = {
        'EVENT': 'HEARTBEAT',
        'uid': loginUserId
    };

    var sendData = ["message", JSON.stringify(data)];

    wx.sendSocketMessage({
        data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
    })
}

//监听socket连接成功
wx.onSocketOpen(function(res) {
    isSocketOpen = true;
    console.log('WebSocket 已经连接！')
    var msg = {
        'EVENT': 'LOGIN',
        'values': loginUser,
        'roomId': loginRoomId
    }

    var sendData = ["message", JSON.stringify(msg)];
    wx.sendSocketMessage({
        data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
    });

    //创建心跳
    createHeartBeat();
   
});

wx.onSocketMessage(function(res) {
    var mData = res.data
    var patt = /^(\d)(\d?)(.*)$/g

    var match = patt.exec(mData);

    if (match) {
        var mpp = /^\["message","(.*)"\]$/g
        var mMatch = mpp.exec(match[3])
        if (mMatch) {
            var content = mMatch[1].replace(/\\/g, '')
            var message = JSON.parse(content);

            switch (message.EVENT) {
                case 'LOGIN':

                    socketid = message.user.uid;
                    
                    break;
                case 'CLOSEROOM':
                    break;
                case 'GONGGAO': //系统公告
                    break;

                case 'SPEAK': // 用户发言

                    if (message.user.pic.indexOf("http") == -1) {
                        message.user.pic = "https:" + message.user.pic;
                    }
                    message.showTime = prettyTime(message.time);
                    messageCallback(message.EVENT, message);

                    break;
            }

        }

    }

});

//监听socket关闭
wx.onSocketClose(function(res) {
    console.log('WebSocket 已关闭！');
});

//监听socket错误
wx.onSocketError(function(res) {
    console.log(res);
});

/*socket end*/

//登录房间
function loginRoom(roomId, user, callback) {
    connectSocket(roomId, user, callback);
}

//获取历史消息
function getHistoryContent() {

    var url = "https://apichat.polyv.net/front/history?roomId=" + loginRoomId + "&start=" + start + "&end=" + (start + 10);

    start = start + 10;

    wx.request({
        url: url,
        method: 'GET',
        success: function(res) {

            if (res) {
                var arr = res.data.slice(0, 10);
                for (var i = 0; i < arr.length - 1; i++) {
                    if (arr[i].user.pic.indexOf("http") == -1) {
                        arr[i].user.pic = "https:" + arr[i].user.pic;
                    }
                    arr[i].showTime = prettyTime(arr[i].time);
                    if (arr[i].user.userId == loginUserId) {
                        arr[i].class = "clearfix right";
                    }
                }

                messageCallback("GETHISTORY", arr);

            } else {
                messageCallback("GETHISTORY", []);
            }

        }
    })
}

//发送消息
function sendMsg(msg) {
    if (isSocketOpen) {
        //去除换行
        msg = msg.replace(/\n/g, '');
        //空白内容不发送
        var t = msg.match(/\s/g);
        if (msg == "" || t && t.length == msg.length) {
            return;
        }

        var data = {
            'EVENT': 'SPEAK',
            'values': [msg],
            'roomId': loginRoomId
        };

        var sendData = ["message", JSON.stringify(data)];

        wx.sendSocketMessage({
            data: [packets.message, events.EVENT, JSON.stringify(sendData)].join("")
        })
    }
}

//时间格式化
function prettyTime(time) {
    var now = (new Date()).getTime();
    var date = new Date(time || "");
    var diff = (now - date.getTime()) / 1000;
    var day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0)
        return;

    return day_diff == 0 && (
            diff < 5 && "刚刚" ||
            diff < 60 && Math.floor(diff) + "秒前" ||
            diff < 120 && "1分钟前" ||
            diff < 3600 && Math.floor(diff / 60) +
            "分钟前" ||
            diff < 7200 && "1小时前" ||
            diff < 86400 && Math.floor(diff / 3600) +
            "小时前") ||
        day_diff == 1 && "昨天" ||
        day_diff < 7 && day_diff + "天前" ||
        day_diff < 31 && Math.ceil(day_diff / 7) + "周前" || day_diff + "天前";
}

//离开房间
function leavePage() {
    wx.closeSocket();
}

//消息监听
function onMessage(callback) {
    messageCallback = callback
}

module.exports = {
    loginRoom: loginRoom,
    leavePage: leavePage,
    getHistoryContent: getHistoryContent,
    sendMsg: sendMsg,
    onMessage: onMessage,
    prettyTime: prettyTime
}