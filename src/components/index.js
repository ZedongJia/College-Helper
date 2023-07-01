import Card from './Card.vue'
import Menu from './Menu.vue'
import NavBar from './NavBar.vue'
import Board from './Board.vue'
import ThemeButton from './ThemeButton.vue'
import HideButton from './HideButton.vue'
import Option from './Option.vue'
import PopFrame from './PopFrame.vue'
import RouteNav from './RouteNav.vue'

export default (app) => {
    app.component('Card', Card)
    app.component('Menu', Menu)
    app.component('NavBar', NavBar)
    app.component('Board', Board)
    app.component('ThemeButton', ThemeButton)
    app.component('HideButton', HideButton)
    app.component('Option', Option)
    app.component('PopFrame', PopFrame)
    app.component('RouteNav', RouteNav)
}
