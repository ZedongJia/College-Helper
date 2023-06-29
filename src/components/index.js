import Card from './Card.vue'
import Menu from './Menu.vue'
import NavBar from './NavBar.vue'
import Board from './Board.vue'
import ThemeButton from './ThemeButton.vue'

export default (app) => {
    app.component('Card', Card)
    app.component('Menu', Menu)
    app.component('NavBar', NavBar)
    app.component('Board', Board)
    app.component('ThemeButton', ThemeButton)
}
