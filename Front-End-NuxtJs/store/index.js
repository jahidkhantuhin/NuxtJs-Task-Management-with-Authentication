export const state = () => ({
  allTasks: [
    {
      imageUrl: "https://miro.medium.com/max/798/1*EWDEUt0fqsmRgpYGFOOMew.png",
      id: "1",
      title: "NuxtJs Task Management",
      clientName: "Brother Yousuf Kamal",
      dueDate: new Date(2020, 7, 21, 10, 15, 10),
      createdAt: new Date(2020, 6, 25, 10, 10, 10),
      location: "Uposohor, Sylhet",
      description:
        "Project can have clients, budget, due date and some more fields. Add a time logger to the task management. So that a user can log how much time they have work on it.",
    },
    {
      imageUrl:
        "https://blog.facebit.net/wp-content/uploads/2019/04/Screen-Shot-2019-04-10-at-12.06.34-PM-1024x762.png",
      id: "2",
      title: "Draggable Vue & React Todo App",
      clientName: "Yousuf Kamal Vai",
      dueDate: new Date(2020, 7, 23, 23, 30, 20),
      createdAt: new Date(2020, 6, 26, 10, 10, 10),
      location: "Shibgonj, Sylhet",
      description:
        "Create todo app. Todo items will be under projects. Every todo item will have a priority and in the list they can be dragged up and down to change priority. so the one with urgent priority will be the first one.",
    },
  ],
  idToken: null,
  userId: null,
});

export const mutations = {
  createTask(state, payload) {
    state.allTasks.push(payload);
  },
  authUser(state, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
  },
  clearAuthData(state) {
    (state.idToken = null), (state.userId = null);
  },
};

export const actions = {
  // Get triggered when hit the 'Create Task' button in 'create-task' page.
  createTask({ commit }, payload) {
    const newTask = {
      title: payload.title,
      clientName: payload.clientName,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      dueDate: payload.date,
      id: payload.title,
      createdAt: new Date(),
    };
    commit("createTask", newTask);
  },

  // Registering User. Get triggered when hit 'sign up' button.
  async signUserUp({ commit }, payload) {
    try {
      const user = await this.$axios.$put("http://localhost:7070/signup", {
        email: payload.email,
        password: payload.password,
        name: "tuhn",
      });
      this.$router.replace("/signin");
      console.log(user);
    } catch (error) {
      console.log(error);
      if (error) {
        if (
          confirm(
            "This email address already used. Please try with different one..."
          )
        ) {
          location.reload();
        } else {
          location.reload();
        }
      }
    }
  },
  // Users Signing in. Get triggered when hit 'sign in' button.
  async signUserIn({ commit, dispatch }, payload) {
    try {
      const user = await this.$axios.$post("http://localhost:7070/login", {
        email: payload.email,
        password: payload.password,
      });
      this.$router.push("/");
      console.log(user);
      // Obtained token & userId from backend. And storing them to the browsers local storage.
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expirationDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem("expirationDate", expirationDate);
      dispatch("autoLogOut", remainingMilliseconds);
      commit("authUser", {
        idToken: user.token,
        userId: user.userId,
      });
    } catch (error) {
      if (error) {
        if (
          confirm(
            "Sorry, Invalid email or password !!! If you want to register then hit ok button......"
          )
        ) {
          this.$router.push("/signup");
        } else {
          this.$router.push("/signin");
        }
      }
      console.log(error);
    }
  },
  // Trigger with 'mounted' life cycle hook in layouts default component.
  autoLogin({ commit }) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();
    if (!token) {
      return;
    }
    if (now >= expirationDate) {
      return;
    }
    commit("authUser", {
      idToken: token,
      userId: userId,
    });
    this.$router.replace("/");
  },
  // Get triggered when hit the 'log out' button.
  logOut({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    commit("clearAuthData");
    this.$router.push("/signin");
  },
  // Auto login dispatched when 'user Sign in' action get triggered.
  autoLogOut({ commit }, expirationTime) {
    setTimeout(() => {
      // token, userId & expiration date obtained from browsers local storage.
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      commit("clearAuthData");
      router.replace("/signin");
    }, expirationTime);
  },
};

export const getters = {
  // Single task obtained from 'All tasks' state using specific tasks id.
  singleTask(state) {
    return (taskId) => {
      return state.allTasks.find((task) => {
        return task.id === taskId;
      });
    };
  },
  // Find users authentication status.
  isAuthenticated(state) {
    return state.userId !== null;
  },
};
