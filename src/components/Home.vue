<template>
  <div>
    <Row>
      <Col span="11" offset="1" v-for="item in blogs" :key="item.id">
        <Card :bordered="false">
          <p slot="title">
            <Tag color="primary" v-for="title in item.titles" :key="title.id">
              {{ title }}
            </Tag>
          </p>
          <p>Content of card</p>
          <p>Content of card</p>
          <p>Content of card</p>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [
        { titles: ['test1'], content: 'Content of card' },
        { titles: ['test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2'], content: 'Content of card' },
        { titles: ['test3'], content: 'Content of card' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.ivu-card-head p, .ivu-card-head-inner{
  height: auto;
}
</style>
