<script>
import { h } from 'vue'
export default {
    props: {
        text: String,
        entity: Array
    },
    data() {
        return {
            renderContent: []
        }
    },
    methods: {
        checkLinkAndReplace() {
            if (this.entity === undefined || this.entity === []) {
                this.renderContent.push(this.text)
                return
            }
            let startPos = 0
            for (let i = 0; i < this.entity.length; i++) {
                const pos = this.text.indexOf(this.entity[i])
                if (pos !== -1) {
                    // push the text before
                    this.renderContent.push(this.text.substring(startPos, pos))
                    // push h
                    this.renderContent.push(h('a', { onclick: this.turnToDetail }, this.entity[i]))
                    // update start_pos
                    startPos = pos + this.entity[i].length
                }
            }
            if (startPos < this.text.length) {
                this.renderContent.push(this.text.substring(startPos, this.text.length))
            }
        },
        turnToDetail(e) {
            const entity = e.target.innerHTML
            this.$router.push({
                path: '/mainBoard/identification/detailContent',
                query: {
                    entity: entity
                }
            })
        }
    },
    render() {
        return h('div', { class: 'link-text' }, this.renderContent.map((item) => item))
    },
    mounted() {
        this.checkLinkAndReplace()
    },
    watch: {
        text() {
            this.checkLinkAndReplace()
        }
    }
}
</script>
<style>
.link-text a {
    cursor: pointer;
    color: orange;
    transition: 0.25s;
}
.link-text a:hover {
    color: var(--item-bg-color);
}
</style>
