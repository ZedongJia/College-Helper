/**
 * 注册一个组件，你需要先引入你的组件
 * 然后加入到installList中
 */
import BackGround from './BackGround.vue'
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
import ChatBoard from './ChatBoard.vue'
import PromptBox from './PromptBox.vue'

const installList = [
    BackGround,
    InfoForm,
    Input,
    Button,
    Title,
    Card,
    Menu,
    NavBar,
    Board,
    ThemeCheck,
    HideButton,
    Option,
    PopFrame,
    RouteNav,
    LinkText,
    Tree,
    TreeNode,
    Form,
    RelationGraph,
    Loading,
    EmptyHint,
    AnswerBoard,
    ChatBoard,
    PromptBox
]

export default {
    install (vue) {
        installList.forEach(e => vue.component(e.name, e))
    }
}
