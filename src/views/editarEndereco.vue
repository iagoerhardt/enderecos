<template>
  <div>
    <h1>Editar Endereço</h1>

    <div class="row">
      <div v-if="excluido" class="alert alert-success">Endereço excuído com sucesso!</div>
      <div class="alert alert-danger" v-if="errorValidate">Preencha todos os campos</div>
      <div class="col-6">
        <b-form-input v-model="zip_code" placeholder="CEP"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="city" placeholder="Cidade"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="state" placeholder="Estado"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="neighborhood" placeholder="Bairro"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="street" placeholder="Rua"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="number" placeholder="Número"></b-form-input>
      </div>
      <div class="col-6">
        <b-form-input v-model="complement" placeholder="Complemento"></b-form-input>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <router-link :to="{ name: 'listaEnderecos' }">
          <b-button variant="primary">Voltar</b-button>
        </router-link>

        <b-button @click="update" variant="success">Salvar</b-button>

        <b-button @click="excluir" variant="outline-danger"> Remover </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zip_code: "",
      city: "",
      state: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      excluido: false,
      errorValidate: false,
    };
  },
  methods: {
    getAddress() {
      this.$http.get(`api/enderecos/${this.$route.params.address}`).then((response) => {
        this.zip_code = response.data.zip_code;
        this.city = response.data.city;
        this.state = response.data.state;
        this.neighborhood = response.data.neighborhood;
        this.street = response.data.street;
        this.number = response.data.number;
        this.complement = response.data.complement;
      });
    },
    update() {
      var data = {
        zip_code: this.zip_code,
        city: this.city,
        state: this.state,
        neighborhood: this.neighborhood,
        street: this.street,
        number: this.number,
        complement: this.complement,
      };

      this.$http
        .put(`api/enderecos/${this.$route.params.address}`, data)
        .then((response) => {
          console.log(response);
          this.errorValidate = false;
        })
        .catch((error) => {
          this.errorValidate = true;
          console.log(error);
        });
    },
    excluir() {
      this.$http
        .delete(`api/enderecos/${this.$route.params.address}`)
        .then((response) => {
          if (response.status == 200) {
            this.excluido = true;

            setTimeout(() => {
              this.$router.push({ name: "listaEnderecos" });
            }, 1000);
          }
          console.log(response.status);
        });
    },
  },
  created() {
    this.getAddress();
  },
};
</script>

<style lang="scss" scoped></style>
