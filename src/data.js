/* eslint-disable */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TABLES, getAllValues } from './database';


export default class Data extends Component {
  state = {
    employees: [],
    departments: [],
  }

  componentWillMount() {
    getAllValues(TABLES.departments).then(departments => this.setState({ departments }));
    getAllValues(TABLES.employees).then(employees => this.setState({ employees }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.goTo}>
          <Icon name='arrow-left' size={32} onPress={() => this.props.navigation.pop()}/>
        </View>
        <View style={styles.type}>
          <Text style={styles.title}>Departamentos: </Text>
          {this.state.departments.map(department => {
            return (
              <Text>{department.name}</Text>
            )
          })}
        </View>
        <View style={styles.type}>
          <Text style={styles.title}>Empregados: </Text>
          {this.state.employees.map(employee => {
            return (
              <View style={styles.employee}>
                <Text>{employee.name}</Text>
                <Text>{employee.CPF}</Text>
              </View>
            )
          })}
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
    padding: 10,
  },
  type: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  employee: {
    marginBottom: 20,
  },
});
