﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message, string profilePhoto)
        {
            await Clients.AllExcept(user).SendAsync("ReceiveMessage", user, message, profilePhoto);
            
            //Clients.All.SendAsync
        }
    }
}
