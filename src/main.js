/* eslint-disable */
import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TABLES, insertValues, getAllValues, getAllFromEmployee, getFilteredValues, deleteAll } from './database';

export default class Main extends Component {

  state = {
    name: '',
    cpf: '',
    list: [],
    emplDept: '',
    listDept: [],
    loading: false,
  }

  cadastrarEmpl = () => {
    insertValues(TABLES.employees, {
      name: this.state.name,
      cpf: this.state.cpf,
      fk: [
        {
          table: TABLES.departments,
          value: this.state.emplDept,
        }
      ]
    });
  }

  cadastrarDept = () => {
    insertValues(TABLES.departments, {
      name: this.state.dept,
    }).then(id => {
      getAllValues(TABLES.departments)
        .then(result => this.setState({ listDept: result}));
    });
  }

  logAll = () => {
    getAllValues(TABLES.departments).then(result => console.log(result));
    getAllValues(TABLES.employees).then(result => console.log(result));
  }

  goTo = () => {
    this.props.navigation.navigate('Data')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.goTo}>
          <Icon name='arrow-right' size={32} onPress={() => this.goTo()}/>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.dept}
            placeholder='Departamento'
            onChangeText={dept => this.setState({ dept }) }
          />
          <Button
            title='Cadastrar Dept'
            backgroundColor='#00A'
            onPress={() => this.cadastrarDept()}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.name}
            placeholder='Nome'
            onChangeText={name => this.setState({ name }) }
          />
          <TextInput
            style={styles.input}
            value={this.state.cpf}
            placeholder='CPF'
            onChangeText={cpf => this.setState({ cpf }) }
          />
          {this.state.listDept.map(dept => (
            <Text>{dept.name}</Text>
          ))}
          <Button
            title='Cadastrar Func'
            backgroundColor='#00A'
            loading={this.state.loading}
            onPress={() => this.cadastrarEmpl()}
          />
        </View>
        <View style={styles.results}>
          <Button
            large
            fontSize={20}
            title='Ver Tudo'
            backgroundColor='#003'
            onPress={() => this.logAll()}
          />
          <Button
            title='Deletar tudo'
            backgroundColor='#F33'
            onPress={() => deleteAll()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC'
  },
  goTo: {
    alignItems: 'flex-end',
    padding: 10,
  },
  form: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  results: {
    height: 200,
  },
});
