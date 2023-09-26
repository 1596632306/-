<template>
    <div class="count-box">
      <button @click="handleSub" class="minus">-</button>
      <input :value="value" @change="handleChange" class="inp" type="text">
      <button @click="handleAdd" class="add">+</button>
    </div>
  </template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      console.log(this.value)
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      console.log(this.value)
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      console.log(e)
      const num = +e.target.value // 转数字处理 (1) 数字 (2) NaN

      // 输入了不合法的文本 或 输入了负值，回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }

      this.$emit('input', num)
    }
  }
}
</script>

  <style lang="less" scoped>
  .count-box {
    width: 110px;
    display: flex;
    .add, .minus {
      width: 30px;
      height: 30px;
      outline: none;
      border: none;
      background-color: #efefef;
    }
    .inp {
      width: 40px;
      height: 30px;
      outline: none;
      border: none;
      margin: 0 5px;
      background-color: #efefef;
      text-align: center;
    }
  }
  </style>
