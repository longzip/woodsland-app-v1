import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation'

// import ExampleScreen from 'App/Containers/Example/ExampleScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import SignInScreen from 'App/Containers/Authentication/SignInScreen'
import SignOutScreen from 'App/Containers/Authentication/SignOutScreen'
import AuthLoadingScreen from 'App/Containers/Authentication/AuthLoadingScreen'
import WorkcentersScreen from 'App/Containers/Workcenters/WorkcentersScreen'
import WorkcenterDetailScreen from 'App/Containers/WorkcenterDetail/WorkcenterDetailScreen'
import ProductionsScreen from 'App/Containers/Productions/ProductionsScreen'
import ProductionDetailScreen from 'App/Containers/ProductionDetail/ProductionDetailScreen'
import WorkordersScreen from 'App/Containers/Workorders/WorkordersScreen'
/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    // The main application screen is our "ExampleScreen". Feel free to replace it with your
    // own screen and remove the example.
    MainScreen: WorkordersScreen,
    // ProductionsScreen,
    WorkcentersScreen,
    ProductionDetailScreen,
    WorkcenterDetailScreen,
    WorkordersScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'MainScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    // headerMode: 'none',
  }
)

const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: StackNavigator,
    },
    Productions: {
      screen: ProductionsScreen,
    },
    Workcenters: {
      screen: WorkcentersScreen,
    },
    Workorders: {
      screen: WorkordersScreen,
    },
    Exit: {
      screen: SignOutScreen,
    },
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
)

const AuthStack = createStackNavigator({ SignIn: SignInScreen }, { headerMode: 'none' })

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
