import {debouce} from "./utils.js"
export const itemListenerMixin = {
    data() {
        return{
            itemImgListener:null,
        }
    },
    mounted() {
        let refresh = debouce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        console.log('混入')
    }
}