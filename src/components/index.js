import InfoForm from './InfoForm.vue'
import Input from './Input.vue'
import Button from './Button.vue'
import Title from './Title.vue'
import Card from './Card.vue'
import Menu from './Menu.vue'
import NavBar from './NavBar.vue'
import Board from './Board.vue'
import ThemeCheck from './ThemeCheck.vue'
import HideButton from './HideButton.vue'
import Option from './Option.vue'
import PopFrame from './PopFrame.vue'
import RouteNav from './RouteNav.vue'
import LinkText from './LinkText.vue'
import Tree from './tree/Tree.vue'
import TreeNode from './tree/TreeNode.vue'
import Form from './Form.vue'
import RelationGraph from './RelationGraph.vue'
import Loading from './Loading.vue'
import EmptyHint from './EmptyHint.vue'
import AnswerBoard from './AnswerBoard.vue'

export default (app) => {
    app.component('InfoForm', InfoForm)
    app.component('Input', Input)
    app.component('Button', Button)
    app.component('Title', Title)
    app.component('Card', Card)
    app.component('Menu', Menu)
    app.component('NavBar', NavBar)
    app.component('Board', Board)
    app.component('ThemeCheck', ThemeCheck)
    app.component('HideButton', HideButton)
    app.component('Option', Option)
    app.component('PopFrame', PopFrame)
    app.component('RouteNav', RouteNav)
    app.component('LinkText', LinkText)
    app.component('Tree', Tree)
    app.component('TreeNode', TreeNode)
    app.component('Form', Form)
    app.component('RelationGraph', RelationGraph)
    app.component('Loading', Loading)
    app.component('EmptyHint', EmptyHint)
    app.component('AnswerBoard', AnswerBoard)
}
