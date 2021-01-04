
function OnGameLaunch()
{
    // Initialize global
    g_Engine = new Engine();
    g_gameData = new GameData();

    //Initialize engine
    g_Engine.Init();

    //TODO: Add States in here
    //..
    g_Engine.AddState(new MainMenuState);

    //set current state in here
    //Set initial state
    g_Engine.SetState(MAIN_MENU_STATE);

    //Run the Engine
    g_Engine.Run();
}

function OnGameFocus()
{ }

function OnGameBlur()
{ }