<template>
  <v-container>
    <v-layout row wrap v-for="task in allTasks" :key="task.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  class="white--text align-end"
                  height="130px"
                  :src="task.imageUrl"
                >
                </v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">
                      Project : " {{ task.title }} "
                    </h5>
                    <h5 class="white--text mb-0">
                      Client : {{ task.clientName }}
                    </h5>
                    <div>Due Date : {{ task.dueDate }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'/tasks/' + task.id">
                    View Task Details
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  middleware: "authenticated",
  computed: {
    ...mapState(["allTasks"]),
  },
};
</script>
