/**
    Source contains ALL Facebook SDK access operations
    Author: Ruell Magpayo <ruellm@yahoo.com>
    Created Oct 23, 2012
	
	Ported to SpiritBubble June 29, 2014
*/

var global_callback = null;
function FBAccess_InviteFriend(callback)
{
    global_callback = callback;
    FBAccess_SendAppRequest(0, 
		"Hi Friends, Professor Brain Memory is really a great brain game! " +
		"You should try, it’s so fun ;-)",
        function (response) {
		
			if((typeof (callback) === 'undefined')) return;
			
            /*if ((typeof (response.to) === 'undefined') ||
                (response.to && response.to.length < 5)) {
                if ((response.to && response.to.length < 5)) {
                    console.log(response.to.length);
                }
                alert("You need to invite atleast 5 friends to get a free gift!");
                return;
            }*/
            if (global_callback && 
				(typeof (response.to) != 'undefined') &&
				(response.to && response.to.length > 0 )) {
                global_callback(response.to.length);
            }

    });
}

function FBAccess_AskLife(id)
{
    if (g_mainUser.id == -1) return;
	FBAccess_SendAppRequest(id, "Your friend is asking for a life in Professor Brain Memory", 
		function(to){
			Ajax_AskForLife(to);		
		});
}

function FBAccess_SendToAll()
{
    if (g_mainUser.id == -1) return;
        FBAccess_SendAppRequest(0, "Been having a good time playing Professor Brain Memory, come check it out",
            function (to) {
                var request = new Array();
                for (var i = 0; i < to.length; i++) {
                    var profile = FB_GetProfile(to[i]);
                    if (profile == null) continue;
                        request.push(profile.id);
                }

                Ajax_AskForLife(request);
    });
}

function FBAccess_UpdateGameData(quantity, amount, currentcy, payment_id)
{
	g_gameData.gold += parseInt(quantity);
	Ajax_UpdateGold();
			
	Ajax_AddTransaction(amount, currency, payment_id, quantity);
}

window['FBAccess_UpdateGameData'] = FBAccess_UpdateGameData; 
