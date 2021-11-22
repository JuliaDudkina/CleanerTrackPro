<template>
  <wrapper>
    <form>
      <h2>Register a new job</h2>
      <div class="flex">
        <label>Type of work:</label>
        <select v-model="type.val">
          <option value="office">Office cleaning</option>
          <option value="home">Home cleaning</option>
          <option value="deep">Deep cleaning</option>
          <option value="outdoor">Outdoor cleaning</option>
          <option value="industrial">Industrial area cleaning</option>
        </select>
      </div>
      <div class="flex">
        <div class="form-control">
          <label for="startDate">Start Date</label>
          <input type="date" id="startDate" v-model="startDate.val">
        </div>
        <div class="form-control">
          <label for="endDate">End Date</label>
          <input type="date" id="endDate" v-model="endDate.val">
        </div>
      </div>
      <div class="form-control flex">
        <label for="hazard">Hazardous materials</label>
        <input type="checkbox" id="hazard" value="hazard" v-model="hazard.val">
      </div>
      <div class="form-control flex">
        <label for="fee">Service Fee: $</label>
        <input type="number" id="fee" v-model="fee.val">
      </div>
      <div class="form-control flex">
        <label>Choose an employee:</label>
        <select v-model="chosenEmployee">
          <option v-for="name in names" :key="name">
            {{ name}}
          </option>
        </select>
      </div>
      <div class="form-control ">
        <label>Choose necessary equipment:</label>
        <div class="form-control flex">
          <label for="">High-pressure cleaner</label>
          <input type="checkbox" id="" value="HP-cleaner" >
        </div>
      </div>
      <link-button>Submit</link-button>
    </form>
  </wrapper>
</template>

<script>
import Wrapper from "../UI/Wrapper";
export default {
  name: "AddWorksite",
  components: {Wrapper},
  data(){
    return{
      startDate:{
        val: '',
        isValid: true,
      },
      type:{
        val: '',
        isValid: true,
      },
      endDate:{
        val: '',
        isValid: true,
      },
      hazard:{
        val: false,
        isValid: true,
      },
      fee:{
        val: null,
        isValid: true,
      },
      chosenEmployee: ''
    }
  },
  computed:{
    names(){
      return this.$store.getters.names;
    }
  },
  methods:{
    loadNames(){
      try {
        this.$store.dispatch('loadNames');
      }catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    }
  },
  created() {
    this.loadNames();
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input{
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus{
  background-color: #e6fdfb;
  outline: none;
  border-color: #0d520d;
}
input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}
input[type='number'] {
  width: 30%;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input{
  border: 1px solid red;
}
.flex{
  display: flex;
  align-items: baseline;
}
.li-visibility{
  /*display: none;*/
  border-bottom: #c2c2c2 solid 1px;
  padding: 10px;
  cursor: pointer;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  border-left: #c2c2c2 solid 1px;
  border-right: #c2c2c2 solid 1px;
}
</style>