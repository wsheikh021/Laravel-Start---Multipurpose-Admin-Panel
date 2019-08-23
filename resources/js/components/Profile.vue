<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-widget widget-user">
          <div class="widget-user-header bg-info-active">
            <h3 class="widget-user-username">Alexander Pierce</h3>
            <h5 class="widget-user-desc">Founder &amp; CEO</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle elevation-2" src alt="User Avatar" />
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card">
            <div class="card-header p-2">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#timeline" data-toggle="tab">Timeline</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#settings" data-toggle="tab">Settings</a>
                </li>
              </ul>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane" id="timeline">
                  <!-- The timeline -->
                  <ul class="timeline timeline-inverse">
                    <!-- timeline time label -->
                    <li class="time-label">
                      <span class="bg-danger">10 Feb. 2014</span>
                    </li>
                    <!-- /.timeline-label -->
                    <!-- timeline item -->
                    <li>
                      <i class="fas fa-envelope bg-primary"></i>

                      <div class="timeline-item">
                        <span class="time">
                          <i class="far fa-clock"></i> 12:05
                        </span>

                        <h3 class="timeline-header">
                          <a href="#">Support Team</a> sent you an
                          email
                        </h3>

                        <div class="timeline-body">
                          Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                          weebly ning heekya handango imeem plugg dopplr jibjab, movity
                          jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                          quora plaxo ideeli hulu weebly balihoo...
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-primary btn-sm">Read more</a>
                          <a href="#" class="btn btn-danger btn-sm">Delete</a>
                        </div>
                      </div>
                    </li>
                    <!-- END timeline item -->
                    <!-- timeline item -->
                    <li>
                      <i class="fas fa-user bg-info"></i>

                      <div class="timeline-item">
                        <span class="time">
                          <i class="far fa-clock"></i> 5 mins ago
                        </span>

                        <h3 class="timeline-header border-0">
                          <a href="#">Sarah Young</a>
                          accepted your friend request
                        </h3>
                      </div>
                    </li>
                    <!-- END timeline item -->
                    <!-- timeline item -->
                    <li>
                      <i class="fas fa-comments bg-warning"></i>

                      <div class="timeline-item">
                        <span class="time">
                          <i class="far fa-clock"></i> 27 mins ago
                        </span>

                        <h3 class="timeline-header">
                          <a href="#">Jay White</a> commented on your
                          post
                        </h3>

                        <div class="timeline-body">
                          Take me to your leader!
                          Switzerland is small and neutral!
                          We are more like Germany, ambitious and misunderstood!
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-warning btn-flat btn-sm">View comment</a>
                        </div>
                      </div>
                    </li>
                    <!-- END timeline item -->
                    <!-- timeline time label -->
                    <li class="time-label">
                      <span class="bg-success">3 Jan. 2014</span>
                    </li>
                    <!-- /.timeline-label -->
                    <!-- timeline item -->
                    <li>
                      <i class="fas fa-camera bg-purple"></i>

                      <div class="timeline-item">
                        <span class="time">
                          <i class="far fa-clock"></i> 2 days ago
                        </span>

                        <h3 class="timeline-header">
                          <a href="#">Mina Lee</a> uploaded new photos
                        </h3>

                        <div class="timeline-body">
                          <img src="http://placehold.it/150x100" alt="..." class="margin" />
                          <img src="http://placehold.it/150x100" alt="..." class="margin" />
                          <img src="http://placehold.it/150x100" alt="..." class="margin" />
                          <img src="http://placehold.it/150x100" alt="..." class="margin" />
                        </div>
                      </div>
                    </li>
                    <!-- END timeline item -->
                    <li>
                      <i class="far fa-clock bg-gray"></i>
                    </li>
                  </ul>
                </div>

                <div class="tab-pane active" id="settings">
                  <form @submit.prevent="updateProfile" class="form-horizontal">
                    <div class="form-group">
                      <label for="inputName" class="col-sm-2 control-label">Name</label>

                      <div class="col-sm-10">
                        <input
                          v-model="form.name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          class="form-control"
                          id="inputName"
                          :class="{ 'is-invalid': form.errors.has('name') }"
                        />
                      </div>
                      <has-error :form="form" field="name"></has-error>
                    </div>

                    <div class="form-group">
                      <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                      <div class="col-sm-10">
                        <input
                          v-model="form.email"
                          type="text"
                          name="email"
                          placeholder="Email"
                          class="form-control"
                          id="inputEmail"
                          :class="{ 'is-invalid': form.errors.has('email') }"
                        />
                      </div>
                      <has-error :form="form" field="email"></has-error>
                    </div>

                    <div class="form-group">
                      <label for="inputExperience" class="col-sm-2 control-label">Experience</label>

                      <div class="col-sm-10">
                        <textarea
                          v-model="form.bio"
                          type="text"
                          name="bio"
                          placeholder="Bio"
                          id="bio"
                          class="form-control"
                          :class="{ 'is-invalid': form.errors.has('bio') }"
                        ></textarea>
                      </div>
                      <has-error :form="form" field="bio"></has-error>
                    </div>

                    <div class="form-group">
                      <label for="photo" class="col-sm-2 control-label">Profile Photo</label>

                      <div class="col-sm-10">
                        <input @change="convertImage" type="file" id="photo" name="photo" />
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputSkills" class="col-sm-2 control-label">Skills</label>

                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputSkills"
                          placeholder="Skills"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                          <label>
                            <input type="checkbox" /> I agree to the
                            <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.nav-tabs-custom -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    convertImage(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.onloadend = () => {
        // console.log('RESULT', reader.result)
        this.form.photo = reader.result;
      };
      reader.readAsDataURL(file);
    },
    updateProfile() {
      axios
        .put("api/profileupdate")
        .then(() => {})
        .catch(() => {});
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
  created() {
    axios
      .get("api/profile")
      .then(({ data }) => {
        this.form.fill(data);
      })
      .catch();
  }
};
</script>