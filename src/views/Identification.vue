<template lang="">
    <div class="wrapper">
        <Board>输入文本：</Board>
        <Board class="zero">
            <Board class="zerotext"><textarea name="description"  cols="135" rows="10" placeholder="Enter text"></textarea></Board>
            <button class="zerobutton">提交！</button>
        </Board>

        <Board @click="firstexpand" class="sizeone">
            [查看识别结果]
        </Board>
        <Board v-if="showfirstBox" class="one">
            袁隆平致力于杂交水稻技术的研究、应用与推广，发明“三系法”籼型杂交水稻，成功研究出“两系法”杂交水稻，创建了超级杂交稻技术体系。并提出并实施“种三产四丰产工程”，运用超级杂交稻的技术成果，出版中、英文专著6部，发表论文60余篇。
        </Board>

        <Board @click="secondexpand" class="sizetwo">
            [查看分词结果]
        </Board>
        <Board v-if="showsecondBox" class="two">
            袁隆平致力于杂交水稻技术的研究、应用与推广，发明“三系法”籼型杂交水稻，成功研究出“两系法”杂交水稻，创建了超级杂交稻技术体系。并提出并实施“种三产四丰产工程”，运用超级杂交稻的技术成果，出版中、英文专著6部，发表论文60余篇。
        </Board>
    </div>
</template>

<script>
export default {
    data() {
    return {
      showfirstBox: false,
      showsecondBox: false
    }
  },
    methods: {
    firstexpand() {
      // ...
      this.showfirstBox = !this.showfirstBox
    },
    secondexpand() {
      // ...
      this.showsecondBox = !this.showsecondBox
    }

  }
}
</script>
<style>
.wrapper {
  width:1100px;
  margin: auto;
}

.zerotext{
    margin: auto;
    width:1000px;
    margin-top: 20px;
}

.zero{
    height: 350px;
    position: relative;
}

.sizeone{
margin-top: 20px;
}

.sizetwo{
margin-top: 20px;
}

.one{
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    height: 100px;
}

.two{
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    height: 100px;
}

textarea {
    display:block;
    margin: auto;
    resize: none;
    background-color: var(--bg-color);
    border:none;
}

.zerobutton{
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translate(-50%, -87%);
    background-color: var(--item-bg-color);
    border-radius:4px;
    color: #fcfada;
    padding: 12px 80px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;

}

</style>
