<template>
  <div class="empty-page">
    <el-result
      icon="warning"
      title="404"
      sub-title="当前页面不存在，或者路由地址已经变更。"
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/dashboard')">
          返回工作台
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
