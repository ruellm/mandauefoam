//
// Entry point to nightmare game engine develop by
// Ruell Magpayo <ruellm@yahoo.com>
//
function OnGameLaunch() {

    // Initialize global
    g_Engine = new Engine();
    g_gameData = new GameData();

    //Initialize engine
    g_Engine.Init();
    //g_gameData.Init();

    //TODO: Add States in here
    //..
    g_Engine.AddState(new SplashScreenState);
    g_Engine.AddState(new LoadState);
    g_Engine.AddState(new GameState);
    g_Engine.AddState(new MainMenuState);

    //Setting the initial state
    g_Engine.SetState(LOAD_STATE);

    //Run the Engine
    g_Engine.Run();
}

function OnGameFocus()
{ }

function OnGameBlur()
{ }

function OnGameExit(e)
{

}

