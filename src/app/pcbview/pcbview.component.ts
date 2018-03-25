import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-pcbview',
  templateUrl: './pcbview.component.html',
  styleUrls: ['./pcbview.component.css']
})
export class PcbviewComponent implements OnInit {

  shapeCounts = 10;
  radius = 8;
  transform = d3.zoomIdentity;
  canvas: any;
  context: any;
  width: number;
  height: number;
  points: any = [];
  isDraged = false;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('pcbview');
    this.context = this.canvas.getContext('2d');

    this.height = this.canvas.height;
    this.width = this.canvas.width;

    for (let i = 0; i < this.shapeCounts; i++) {
      const p =  [
        this.getRandom(1, this.width),
        this.getRandom(1, this.height),
        this.getRandom(3, 12),
        this.getRandom(3, 15)
      ];
      // console.log(i + " " + p);
      this.points.push(p);
    }

    const tooltip = d3.select('theCanvas')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0.0);

    d3.select(this.canvas)
      .call(d3.drag().subject(() => this.dragsubject())
                     .on('drag', () => {
                       d3.select('#tooltip')
                         .style('opacity', 0);
                       return this.dragged();
                      }))
      .call(d3.zoom().scaleExtent([1 / 8, 10]).on('zoom', () => this.zoomed()))
      .call(() => {
        this.render();
      })
      .on('mousemove', () => {
        const subject = this.selectSubject();
        if (subject.isSelected === true) {
          d3.select('#tooltip')
            .style('opacity', 1)
            .style('top', d3.event.pageY - 20 + 'px')
            .style('left', d3.event.pageX + 1 + 'px')
            .html('ID: ' + subject.id + '<br>' +
                  'X: ' + Math.floor(subject.point[0]) + '<br>' +
                  'Y: ' + Math.floor(subject.point[1]) + '<br>' +
                  'W: ' + subject.point[2] + '<br>' +
                  'H: ' + subject.point[3]);
       } else {
         d3.select('#tooltip')
           .style('opacity', 0);
        }
      });
    // this.pcbview
  }

  selectSubject() {
    const
    x = this.transform.invertX(d3.event.layerX || d3.event.offsetX),
    y = this.transform.invertY(d3.event.layerY || d3.event.offsety);

    for (let i = this.points.length - 1; i >= 0; --i) {
      const point = this.points[i];
      const tx = point[0];
      const ty = point[1];
      const w = point[2];
      const h = point[3];
      if ( x >= tx && x <= tx + w && y >= ty && y <= ty + h ) {
        return {isSelected: true, id: i, point: point};
      }
    }
    return {isSelected: false, id: null, point: null};
  }
  zoomed() {
    this.transform = d3.event.transform;
    this.render();
  }

  dragsubject() {
    const
      x = this.transform.invertX(d3.event.x),
      y = this.transform.invertY(d3.event.y);

    for (let i = this.points.length - 1; i >= 0; --i) {
      const point = this.points[i];
      const tx = point[0];
      const ty = point[1];
      const w = point[2];
      const h = point[3];
      if ( x >= tx && x <= tx + w && y >= ty && y <= ty + h ) {
        point.x = this.transform.applyX(point[0]);
        point.y = this.transform.applyY(point[1]);
        return point;
      }
    }
  }

  dragged() {
    d3.event.subject[0] = this.transform.invertX(d3.event.x);
    d3.event.subject[1] = this.transform.invertY(d3.event.y);

    this.render();
  }

  render() {
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.context.translate(this.transform.x, this.transform.y);
    this.context.scale(this.transform.k, this.transform.k);
    this.points.forEach((point) => {
      this.context.moveTo(point[0] + this.radius, point[1]);
      this.context.fillRect(point[0], point[1], point[2], point[3]);
    });
    this.context.fill();
    this.context.restore();
  }

  getRandom(min, max): any {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
