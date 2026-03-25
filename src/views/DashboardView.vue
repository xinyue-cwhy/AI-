<template>
  <div class="dashboard-page">
    <section class="dashboard-hero">
      <div>
        <div class="section-kicker">Overview</div>
        <h2>工作台</h2>
        <p>这里已经接入布局、状态管理、环境变量、请求封装和路由守卫。</p>
      </div>
      <el-button type="primary" plain @click="loadSummary">刷新数据</el-button>
    </section>

    <div class="dashboard-stats">
      <el-card shadow="hover">
        <div class="stat-label">访问量</div>
        <div class="stat-value">{{ summary.visits }}</div>
      </el-card>

      <el-card shadow="hover">
        <div class="stat-label">成交数</div>
        <div class="stat-value">{{ summary.sales }}</div>
      </el-card>

      <el-card shadow="hover">
        <div class="stat-label">转化率</div>
        <div class="stat-value">{{ summary.conversionRate }}</div>
      </el-card>
    </div>

    <el-card shadow="never">
      <template #header>
        <div class="card-title">当前接入项</div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="notice in summary.notices"
          :key="notice"
          type="primary"
        >
          {{ notice }}
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import { getDashboardSummaryApi } from '@/api/dashboard'

const summary = reactive({
  visits: 0,
  sales: 0,
  conversionRate: '0%',
  notices: [] as string[],
})

const loadSummary = async () => {
  try {
    const data = await getDashboardSummaryApi()
    Object.assign(summary, data)
  } catch (error) {
    ElMessage.error(error instanceof Error ? error.message : '加载失败')
  }
}

onMounted(() => {
  loadSummary()
})
</script>
