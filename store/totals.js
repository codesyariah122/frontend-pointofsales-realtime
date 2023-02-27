/**
 * @author: pujiermanto@gmail.com
 * @globals: method reusable for any component and any source 
*/

import axios from 'axios';

export const strict = false;

export const state = () => ({
  api_url: process.env.NUXT_ENV_API_URL,
  totalUser: 0,
  totalProduct: 0,
  percentageProduct: {},
  totalCategory: 0,
  totalCustomer: 0
});

export const mutations = {
  TOTAL_DATA_USER(state, data) {
    state.totalUser = data
  },

  TOTAL_DATA_PRODUCT(state, data) {
    state.totalProduct = data
  },

  PERCENTAGE_PRODUCT(state, data) {
    state.percentageProduct = data
  },

  TOTAL_DATA_CATEGORY(state, data) {
    state.totalCategory = data
  },

  TOTAL_DATA_CUSTOMER(state, data) {
    state.totalCustomer = data
  }
};

export const actions = {
  totalDataQuery({commit}, param) {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${param.token.token}`
      }
    }
    const endPoint = `${param.api_url}/fitur/total-data?type=${param.type}`
    this.$axios.get(endPoint, config)
    .then(({data}) => {
      switch(param.type) {
        case 'TOTAL_USER':
          commit('TOTAL_DATA_USER', data?.total)
        break;

        case 'TOTAL_PRODUCT':
          commit('TOTAL_DATA_PRODUCT', data?.total)
          commit('PERCENTAGE_PRODUCT', data?.percentage)
        break;

        case 'TOTAL_CATEGORY':
          commit('TOTAL_DATA_CATEGORY', data?.total)
        break;

      case 'TOTAL_CUSTOMER':
          commit('TOTAL_DATA_CUSTOMER', data?.total)
        break;

        default:
          console.log('No Param Type')
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
};

export const getters = {
  getTotalUser(state) {
    return state.totalUser
  },
  getTotalProduct(state) {
    return state.totalProduct
  },
  getPercentageProduct(state) {
    return state.percentageProduct
  },
  getTotalCategory(state) {
    return state.totalCategory
  },
  getTotalCustomer(state) {
    return state.totalCustomer
  },
};
