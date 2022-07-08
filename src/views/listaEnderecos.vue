<template>
  <div>
    <h1>Listagem</h1>
    <div class="row">
      <div class="alert alert-success" v-if="inclui">
        Endereço adicionado com sucesso!
      </div>
      <div class="col-12 mt-4">
        <b-button variant="outline-primary" v-b-modal.modal-1>
          Adicionar novo endereço
        </b-button>
      </div>
      <div class="col-11 mt-4">
        <b-form-input
          type="search"
          v-model="searchStreet"
          placeholder="Logradouro"
        ></b-form-input>
      </div>
      <div class="col-1 mt-4">
        <b-button @click="getByStreet" variant="outline-primary"> Buscar </b-button>
      </div>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>CEP</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Bairro</th>
          <th>Rua</th>
          <th>Número</th>
          <th>Complemento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="endereco in items" :key="endereco.id">
          <td>{{ endereco.zip_code }}</td>
          <td>{{ endereco.city }}</td>
          <td>{{ endereco.state }}</td>
          <td>{{ endereco.neighborhood }}</td>
          <td>{{ endereco.street }}</td>
          <td>{{ endereco.number }}</td>
          <td>{{ endereco.complement }}</td>
          <td>
            <router-link
              :to="{ name: 'editarEndereco', params: { address: endereco.id } }"
            >
              <b-button variant="outline-primary"> Editar </b-button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal v-model="modalAdd" hide-footer id="modal-1" title="Cadastro de endereço">
      <div class="row">
      <div class="alert alert-danger" v-if="errorValidate">
        Preencha todos os campos
      </div>
      
        <div class="col-6 mt-4">
          <b-form-input v-model="zip_code" placeholder="CEP"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-button @click="buscaCep" variant="primary">Buscar pelo CEP</b-button>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="city" placeholder="Cidade"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="state" placeholder="Estado"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="neighborhood" placeholder="Bairro"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="street" placeholder="Rua"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="number" placeholder="Número"></b-form-input>
        </div>
        <div class="col-6 mt-4">
          <b-form-input v-model="complement" placeholder="Complemento"></b-form-input>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <b-button @click="addEndereco" variant="success">Adicionar Endereço</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
      zip_code: "",
      city: "",
      state: "",
      selected: null,
      inclui: false,
      modalAdd: false,
      searchStreet: "",
      errorValidate: false,
    };
  },
  methods: {
    addEndereco() {
      var data = {
        neighborhood: this.neighborhood,
        street: this.street,
        number: this.number,
        complement: this.complement,
        zip_code: this.zip_code,
        city: this.city,
        state: this.state,
      };

      this.$http
        .post("/api/enderecos", data)
        .then((response) => {
          if (response.status == 200) {
            this.modalAdd = false;
            this.inclui = true;

            this.items.push(data);
            this.neighborhood = "";
            this.street = "";
            this.number = "";
            this.complement = "";
            this.zip_code = "";
            this.city = "";
            this.state = "";
            this.errorValidate = false;

            setTimeout(() => {
              this.inclui = false;
            }, 2000)

          }
          console.log(response);
        })
        .catch((error) => {
          this.errorValidate = true;
          console.log(error);
        });
    },
    getList() {
      this.$http
        .get("/api/enderecos")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buscaCep() {
      this.$http.get(`api/enderecos/busca-cep/${this.zip_code}`).then((response) => {
        this.city = response.data.city;
        this.state = response.data.state;
        this.neighborhood = response.data.neighborhood;
        this.street = response.data.street;
        this.number = response.data.number;
        this.complement = response.data.complement;
        console.log(response);
      });
    },
    getByStreet() {
      this.$http
        .get(`api/busca-enderecos/rua/${this.searchStreet}`)
        .then((response) => {
          this.items = [];
          this.items = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    var list = [];
    this.items = list;
    this.getList();
  },
};
</script>

<style lang="scss" scoped></style>
