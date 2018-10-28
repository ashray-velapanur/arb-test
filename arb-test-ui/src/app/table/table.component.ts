import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {MatInput} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  socket: SocketIOClient.Socket;

  fileNames = null;
  fileData = null;
  tableData = null;

  constructor() {
    this.socket = io.connect("http://localhost:8000");
  }

  ngOnInit() {
    this.socket.on("fileNames", (data) => {
      this.fileNames = data.fileNames;
    });

    this.socket.on("fileData", (data) => {
      this.fileData = JSON.parse(data.data);

      var rows = [];
      var keys = Object.keys(this.fileData[0]);
      rows.push(keys);

      this.fileData.forEach(function(d) {
        rows.push(Object.values(d));
      });

      this.tableData = rows;
    });
  }

  onChange(selectedFile) {
    this.socket.emit("fetchData", {
      fileName: selectedFile
    });
  }

}
