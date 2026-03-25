<template>
  <div class="profile-page">
    <el-card shadow="hover">
      <template #header>
        <div class="card-title">个人中心</div>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">
          {{ authStore.profile?.name ?? '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          {{ authStore.profile?.role ?? '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ authStore.profile?.email ?? '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Token">
          <span class="token-text">{{ authStore.token || '-' }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
