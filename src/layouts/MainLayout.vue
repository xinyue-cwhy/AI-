<template>
  <el-container class="layout-shell">
    <el-aside :width="appStore.sidebarCollapsed ? '72px' : '220px'" class="layout-aside">
      <div class="layout-logo">
        <span class="layout-logo-mark">A</span>
        <span v-if="!appStore.sidebarCollapsed" class="layout-logo-text">
          {{ appTitle }}
        </span>
      </div>

      <el-menu
        :default-active="route.path"
        class="layout-menu"
        :collapse="appStore.sidebarCollapsed"
        router
      >
        <el-menu-item
          v-for="item in menuRoutes"
          :key="item.path"
          :index="item.path"
        >
          <span>{{ item.meta?.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <el-button text @click="appStore.toggleSidebar">
            {{ appStore.sidebarCollapsed ? '展开' : '收起' }}
          </el-button>
        </div>

        <div class="header-right">
          <el-tag type="info">{{ authStore.profile?.role ?? '访客' }}</el-tag>
          <span class="header-user">{{ authStore.profile?.name ?? '未登录' }}</span>
          <el-button text @click="handleLogout">退出</el-button>
        </div>
      </el-header>

      <el-main class="layout-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'

import { routes } from '@/router/routes'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const appTitle = import.meta.env.VITE_APP_TITLE

const menuRoutes = computed(() => {
  const root = routes.find((item) => item.path === '/')
  const children = root?.children ?? []

  return children
    .filter((item) => !item.meta?.hidden)
    .map((item) => ({
      ...item,
      path: `/${item.path}`,
    }))
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
