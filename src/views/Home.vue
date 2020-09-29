<template>
  <v-container fluid fill-width>
    <suggestion-bar :key="$store.state.changeCounter" :headers="$store.state.colHeaders" ref="suggestionBar" :controller="this.col"/>
    <v-row id="dataPrev">
      <Table ref="dataTablePrev" :key="key" :settings="hotSettingsPrev" :selected="selectedColumns"/>
    </v-row>
    <v-row align="center" justify="center" id="syncBox">
      <!--Dropdown @changeSelected="changeSelectedColumns"/>
      <v-col cols=3>
        <v-checkbox color="grey darken-3" id="checkbox" label="Synchronized Scrolling" v-model="syncScroll"/>
      </v-col-->
      <!--v-col cols=3>
        <p align-center justify-center>{{this.$store.state.colHeaders[this.col]}}</p>
      </v-col-->
      <v-col cols=3 align="center">
        <v-btn
          color="black"
          text
          @click="applyTrans()"
        >
          Apply to Data
        </v-btn>
      </v-col>
      <v-col cols=3 align="center">
        <v-btn
          color="black"
          text
          @click="resetTrans()"
        >
          Reset Changes
        </v-btn>
      </v-col>
      <v-col cols=3 align="center">
        <v-btn 
          color="green" 
          text
          @click="exportToCSV()"
        >
          Export Data To CSV File
        </v-btn>
      </v-col>
      <v-col cols=3 align="center">
        <v-btn 
          color="green" 
          text
          @click="exportTrans()"
        >
          Export Changes To File
        </v-btn>
      </v-col>
    </v-row>
    <v-row id="originalData">
      <Table ref="dataTable" :key="key" :settings="hotSettings1" original="true"/>
    </v-row>
  </v-container>
</template>

<script>
import Table from '@/components/Table.vue'
import SuggestionBar from '@/components/SuggestionBar.vue'
import { saveAs } from 'file-saver';
//import fs from 'fs'
//import Dropdown from '@/components/SelectMenu.vue'

export default {
  name: 'home',
  components:{
    Table,
    //Dropdown,
    SuggestionBar
  },
  data: function() {
    return {
      selectedColumns:[],
      col: 0,
      syncScroll: false,
      selected: null,
      key:0,
      islive: false,

      hotSettings1: {
        columnSorting: true,
        rowHeaders: true,
        width:'100%',
        stretchH: 'all',
        height: '255',
        overflow: 'hidden',
        filters: true,
        dropdownMenu:{
          items:{
            "filter_by_condition":{},
            "filter_operators":{},
            "filter_by_condition2":{},
            "filter_by_value":{},
            "filter_action_bar":{}
          }
        },
        exportFile: true,
        licenseKey: 'non-commercial-and-evaluation'
      },
      hotSettingsPrev: {
        afterSelectionEnd: () => {
          this.updateModel()
        },
        selectionRanges: 'multiple',
        columnSorting: true,
        rowHeaders: true,
        width:'100%',
        stretchH: 'all',
        height: '255',
        filters: true,
        dropdownMenu:{
          items:{
            'remove_column':{
              name: "Remove Column",
              callback:  (key,options) => {
                var payload = {
                  options: options,
                  job: 'removeCol'
                }
                this.$store.dispatch("removeCol",payload)
              }
            },
            '---------':{},
            "filter_by_condition":{},
            "filter_operators":{},
            "filter_by_condition2":{},
            "filter_by_value":{},
            "filter_action_bar":{}
          }
        },
        overflow: 'hidden',
        licenseKey: 'non-commercial-and-evaluation',
      }
    }
  },
  methods:{
    /*changeSelectedColumns: function(arg,n){
      if(n==0){
        this.selectedColumns = []
      }
      this.selectedColumns.push(arg)
    },*/
    exportToCSV: function(){
      this.$refs.dataTable.exportToFile()
    },
    exportTrans: function(){
      var data = this.$store.state.finalTrans
      var arr = []
      var _ = require('lodash')

      _.each(data, (trans) => {
        arr.push(JSON.stringify(trans))
      })

      var blob = new Blob([arr.toString()],
                { type: "text/plain;charset=utf-8" });
            saveAs(blob, "Transformations.json");
    },
    updateModel: function(){
      this.col = this.$refs.dataTablePrev.getSelected()
      this.$refs.dataTablePrev.clearHighlight()
      //this.$refs.suggestionBar.updateModel(this.col)
    },
    applyTrans: function(){
      this.$store.dispatch('applyTrans')
    },
    resetTrans: function(){
      this.$store.dispatch('resetTrans')
    }
  }
}

</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style>

.card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>