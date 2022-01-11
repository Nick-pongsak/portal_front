<template>
  <div>
    <div :id="'modal-' + typeModal" class="modal" v-show="showModal">
      <div class="close" @click="close"></div>
      <div class="content">
        <div class="text" v-html="renderHtml()"></div>
        <div class="buttons">
          <div class="button" @click="clickButton('cancel')">
            {{ "Cancel" }}
          </div>
          <div class="button" :class="'b-green'" @click="clickButton('ok')">
            {{ renderBtn() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    // mode: {
    //   type: Number,
    //   default: 0
    // }
  },
  data() {
    return {
      messages: [
        {
          text: `TEST`,
        },
      ],
    };
  },
  computed: {
    showModal() {
      return this.$store.getters.showModal;
    },
    typeModal() {
      return this.$store.getters.typeModal;
    },
    detailModal() {
      return this.$store.getters.detailModal;
    },
  },
  methods: {
    renderHtml() {
      return "";
    },
    renderBtn() {},
    close() {
      this.$eventbus.$emit("modal-callback", "cancel");
      this.$store.dispatch("SetModal", { mode: this.typeModal, value: false });
    },
    clickButton(btn) {
      this.$eventbus.$emit("modal-callback", btn);
      this.$store.dispatch("SetModal", { mode: this.typeModal, value: false });
    },
  },
};
</script>
<style>
.backdrop-dialog {
  width: 100%;
  height: 100%;
  background: #000;
  position: absolute;
  opacity: 0.1;
}
</style>
