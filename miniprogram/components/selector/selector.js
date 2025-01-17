Component({
  properties: {
    title: String,
    options: {
      type: Array,
      value: []
    },
    value: {
      type: String,
      value: ''
    }
  },

  data: {
    selected: ''
  },

  lifetimes: {
    attached() {
      this.setData({
        selected: this.properties.value
      })
    }
  },

  methods: {
    handleSelect(e) {
      const { id } = e.currentTarget.dataset
      this.setData({ selected: id })
      this.triggerEvent('change', { value: id })
    }
  }
}) 