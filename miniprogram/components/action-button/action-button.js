Component({
  properties: {
    text: String,
    type: {
      type: String,
      value: 'primary'
    },
    loading: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleTap() {
      if (!this.properties.disabled && !this.properties.loading) {
        this.triggerEvent('tap')
      }
    }
  }
}) 