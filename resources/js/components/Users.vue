<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-5 mb-5" v-if="$gate.isAdminOrAuthor()">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button class="btn btn-success" @click="ShowNewModal">
                Add New
                <span class="ml-1"></span>
                <i class="fas fa-user-plus fa-fw"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Reg Date</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.type | upText}}</td>
                  <td>{{user.created_at | myDate}}</td>
                  <td>
                    <button @click="ShowEditModal(user)">
                      <i class="fa fa-edit text-blue"></i>
                    </button>
                    <span class="ml-1"></span>
                    <button @click="DeleteUser(user.id)">
                      <i class="fa fa-trash text-red"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <pagination :data="users" @pagination-change-page="getResults"></pagination>
          </div>
          <!-- /.card-body -->
        </div>
      </div>

      <div class="col-md-12 mt-5 mb-5" v-else>
        <not-found></not-found>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-show="!editMode" class="modal-title" id="exampleModalLabel">Add User</h5>
            <h5 v-show="editMode" class="modal-title" id="exampleModalLabel">Update User's Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <form @submit.prevent="editMode ? UpdateUser() : CreateUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>

              <div class="form-group">
                <select
                  v-model="form.type"
                  type="text"
                  name="type"
                  placeholder="Type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value>Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>

              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  type="text"
                  name="bio"
                  placeholder="Bio"
                  id="bio"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                ></textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button v-show="editMode" type="submit" class="btn btn-success">Update User</button>
              <button v-show="!editMode" type="submit" class="btn btn-primary">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: true,
      users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  methods: {
    getResults(page) {
      axios.get("api/user?page=" + page).then(response => {
        this.users = response.data;
      });
    },
    ShowNewModal() {
      this.editMode = false;
      this.form.reset();
      $("#exampleModal").modal("show");
    },
    ShowEditModal(user) {
      this.editMode = true;
      this.form.reset();
      this.form.clear();
      $("#exampleModal").modal("show");
      this.form.fill(user);
    },
    LoadUser() {
      if (this.$gate.isAdminOrAuthor) {
        axios.get("api/user").then(response => {
          this.users = response.data;
        });
      }
    },
    CreateUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          $("#exampleModal").modal("hide");
          this.$Progress.finish();
          Toast.fire({
            type: "success",
            title: "User created successfully"
          });

          //using custom events
          Fire.$emit("AfterCreated");
        })
        .catch(() => {
          this.$Progress.fail();
          Toast.fire({
            type: "error",
            title: "Some error occured, please try again later!"
          });
        });
    },
    UpdateUser() {
      this.$Progress.start();
      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          $("#exampleModal").modal("hide");
          this.$Progress.finish();
          Toast.fire({
            type: "success",
            title: "User updated successfully"
          });

          //using custom events
          Fire.$emit("AfterCreated");
        })
        .catch(() => {
          this.$Progress.fail();
          Toast.fire({
            type: "error",
            title: "Some error occured, please try again later!"
          });
        });
    },
    DeleteUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$Progress.start();
          this.form
            .delete("api/user/" + id)
            .then(() => {
              Toast.fire({
                type: "success",
                title: "User deleted successfully"
              });
              this.$Progress.finish();

              //using custom events
              Fire.$emit("AfterCreated");
            })
            .catch(() => {
              this.$Progress.fail();
              Toast.fire({
                type: "error",
                title: "Some error occured, please try again later!"
              });
            });
        }
      });
    }
  },
  mounted() {
    this.LoadUser();

    //using custom events
    Fire.$on("AfterCreated", () => this.LoadUser());

    Fire.$on("searching", () => {
      let query = this.$parent.search;
      axios
        .get("api/findUser?q=" + query)
        .then(response => {
          this.users = response.data;
        })
        .catch(() => {
          Toast.fire({
            type: "error",
            title: "Some error occured, please try again later!"
          });
        });
    });
  }
};
</script>