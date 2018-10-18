<template>
  <div v-if="item" class="menu-wrapper">
    <template v-if="item.children.length === 0">
      <a :href="item.menuUrl" target="_blank" @click="clickLink(item.menuUrl,$event)">
        <el-menu-item :index="resolvePath(item.menuId)" :class="{'submenu-title-noDropdown':!isNest}">
          <menu-item v-if="item.menuUrl" :icon="item.menuIcon" :title="generateTitle(item.menuI18n)" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="resolvePath(item.menuId)">
      <template slot="title">
        <menu-item v-if="item.menuUrl" :icon="item.menuIcon" :title="generateTitle(item.menuI18n)" />
      </template>

      <template v-for="child in item.children">
        <menu-tree v-if="child.children&&child.children.length>0" :is-nest="true" :item="child" :key="child.menuId" 
          :baseIndex="child.menuId+''" class="nest-menu" />

        <a v-else :href="child.menuUrl" :key="child.menuId" target="_blank" @click="clickLink(child.menuUrl,$event)">
          <el-menu-item :index="resolvePath(child.menuId)">
            <menu-item v-if="child.menuUrl" :icon="child.menuIcon" :title="generateTitle(child.menuI18n)" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import {generateTitle} from '@/utils/i18n'
  import { validateURL} from '@/utils/validate'
  import MenuItem from './menuItem'

  export default {
    name: 'MenuTree',
    components: {
      MenuItem
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      baseIndex:{
        type: String,
        default:''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    created(){
    },
    methods: {
      resolvePath(menuId){
        return path.resolve(this.baseIndex , menuId+'');
      },
      isExternalLink(routePath) {
        return validateURL(routePath)
      },
      clickLink(routePath, e) {
        if (!this.isExternalLink(routePath)) {
          e.preventDefault()
          const path = this.resolvePath(routePath)
          this.$router.push(path)
        }
      },
      generateTitle
    }
  }
</script>
