import Title from './Title.vue'
import Card from './Card.vue'
import Menu from './Menu.vue'
import NavBar from './NavBar.vue'
import Board from './Board.vue'
import ThemeButton from './ThemeButton.vue'
import HideButton from './HideButton.vue'
import Option from './Option.vue'
import PopFrame from './PopFrame.vue'
import RouteNav from './RouteNav.vue'
import LinkText from './LinkText.vue'
import Tree from './Tree.vue'
import TreeNode from './TreeNode.vue'
import Form from './Form.vue'
import RelationGraph from './RelationGraph.vue'

export default (app) => {
    app.component('Title', Title)
    app.component('Card', Card)
    app.component('Menu', Menu)
    app.component('NavBar', NavBar)
    app.component('Board', Board)
    app.component('ThemeButton', ThemeButton)
    app.component('HideButton', HideButton)
    app.component('Option', Option)
    app.component('PopFrame', PopFrame)
    app.component('RouteNav', RouteNav)
    app.component('LinkText', LinkText)
    app.component('Tree', Tree)
    app.component('TreeNode', TreeNode)
    app.component('Form', Form)
    app.component('RelationGraph', RelationGraph)
}
