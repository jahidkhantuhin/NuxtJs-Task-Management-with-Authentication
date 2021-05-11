<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ singleTask.title }}</h4>
          </v-card-title>
          <v-img
            class="white--text align-end"
            height="400px"
            :src="singleTask.imageUrl"
          >
          </v-img>
          <v-card-text>
            <div class="info--text">
              <strong> Task Created At - </strong> {{ singleTask.createdAt }}
            </div>
            <div class="info--text">
              <strong> Project due date - </strong> {{ singleTask.dueDate }}
            </div>
            <div class="info--text">{{ singleTask.location }}</div>
            <div>
              <strong> Project description - </strong>
              {{ singleTask.description }}
            </div>
          </v-card-text>
        </v-card>
        <timeLogger
          :dueDate="singleTask.dueDate"
          :createdAt="singleTask.createdAt"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import timeLogger from "~/components/timeLogger.vue";
export default {
  components: {
    timeLogger,
  },
  data() {
    return {
      // id obtain from route params.
      id: this.$route.params.id,
    };
  },
  middleware: "authenticated",
  computed: {
    // Signle task obtain from 'singleTask' getters.
    singleTask() {
      return this.$store.getters.singleTask(this.id);
    },
  },
};
</script>
