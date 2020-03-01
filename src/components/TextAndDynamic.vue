<template>
    <div>
        <TextEditor/>
        <Dynamic />
    </div>
</template>
<script>
import Dynamic from '@/components/Dynamic.vue'
import TextEditor from '@/components/TextEditor.vue'
export default {
    components: {
        Dynamic,
        TextEditor
    },
    data() {
        return {
            dynamicData: []
        }
    },
    methods: {
        async getDynamicData() {
            var res = await this.axios.get('/api/getDynamicInfo',{params: {start: this.startNum,nums: this.limit}});
            if (res.data.type == 'success') {
                this.dynamicData = res.data.dynamicInfoArray;
            }  
        }
        
    },
    created() {
       this.getDynamicData();
    }

}
</script>
