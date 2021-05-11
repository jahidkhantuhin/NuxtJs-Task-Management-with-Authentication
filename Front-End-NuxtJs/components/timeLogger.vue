<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-row no-gutters>
          <v-col>
            <v-card flat class="text-xs-center ma-3">
              <v-card-title>
                <h3 class="primary--text">Remaining time till due date</h3>
              </v-card-title>
              <v-card-text>
                <h2>
                  {{ displayDays }} Days : {{ displayHours }} hrs :
                  {{ displayminutes }} mins : {{ displayseconds }} secs
                </h2>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col order="1">
            <v-card flat class="text-xs-center ma-3">
              <v-card-title>
                <h3 class="primary--text">Time passed since task created</h3>
              </v-card-title>
              <v-card-text>
                <h2>
                  {{ passedDays }} Days : {{ passedHours }} hrs :
                  {{ passedminutes }} mins : {{ passedseconds }} secs
                </h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // Props obtained from 'taks/_id.vue' page.
  props: ["dueDate", "createdAt"],
  data() {
    return {
      displayDays: 0,
      displayHours: 0,
      displayminutes: 0,
      displayseconds: 0,
      passedDays: 0,
      passedHours: 0,
      passedminutes: 0,
      passedseconds: 0,
    };
  },
  computed: {
    // Below mentioned properties for Countdown Timer.....
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
  },
  // showRemainingTime & passedTime methods automatically get triggered with 'mounted' life cycle hook.
  mounted() {
    this.showRemainingTime();
    this.passedTime();
  },
  methods: {
    // Days, hours, minutes & seconds displaying formation.
    formattedNum(num) {
      return num < 10 ? "0" + num : num;
    },
    // Remaining time till the tasks due date.
    showRemainingTime() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = this.dueDate.getTime() - now.getTime();
        if (distance < 0) {
          clearInterval(timer);
          return;
        }
        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.displayminutes = this.formattedNum(minutes);
        this.displayseconds = this.formattedNum(seconds);
        this.displayHours = this.formattedNum(hours);
        this.displayDays = this.formattedNum(days);
      }, 1000);
    },
    // Amount of time passed since the task created.
    passedTime() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = now.getTime() - this.createdAt.getTime();
        if (distance < 0) {
          clearInterval(timer);
          return;
        }
        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.passedminutes = this.formattedNum(minutes);
        this.passedseconds = this.formattedNum(seconds);
        this.passedHours = this.formattedNum(hours);
        this.passedDays = this.formattedNum(days);
      }, 1000);
    },
  },
};
</script>
