import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import { PcbViewActionsType } from './actions/pcbview.actions';

import { PcbviewService } from './pcbview.service';
import { Components } from './models/componentsDB';
import * as d3 from 'd3';

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-pcbview',
  templateUrl: './pcbview.component.html',
  styleUrls: ['./pcbview.component.css']
})
export class PcbviewComponent implements OnInit {

  radius = 8;
  transform = d3.zoomIdentity;
  canvas: any;
  context: any;
  width: number;
  height: number;
  components: any = [];
  components$: Observable<Components[]>; // public的成员变量声明不能在私有成员后面,tslint规则

  @ViewChild('pcbview')
  canvasRef: ElementRef;
  constructor(private store$: Store<fromRoot.AppState>,
              private pcbviewService: PcbviewService) {
    this.store$.dispatch({type: PcbViewActionsType.LOAD_LOCAL_DATA});
    this.components$ = this.store$.select(fromRoot.fromPcbview.selectAllComponents);

    this.components$.subscribe(
      res => {

        for ( let i = 0; i < res.length; i++ ) {
          // 这里必须使用从新开辟一个数组才能被push,或者先将数组初始化后在push
          const component = [res[i].X, res[i].Y, res[i].W, res[i].H, res[i].id];
          this.components.push(component);
        }
        if ( this.components.length !== 0 ) {
          this.render();
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {

    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.height = this.canvas.height;
    this.width = this.canvas.width;

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
            .html('ID: ' + subject.component[4] + '<br>' +
                  'X: ' + Math.floor(subject.component[0]) + '<br>' +
                  'Y: ' + Math.floor(subject.component[1]) + '<br>' +
                  'W: ' + subject.component[2] + '<br>' +
                  'H: ' + subject.component[3]);
       } else {
         d3.select('#tooltip')
           .style('opacity', 0);
        }
      });
  }

  selectSubject() {
    const
    x = this.transform.invertX(d3.event.layerX || d3.event.offsetX),
    y = this.transform.invertY(d3.event.layerY || d3.event.offsety);

    for (let i = this.components.length - 1; i >= 0; --i) {
      const component = this.components[i];
      const tx = component[0];
      const ty = component[1];
      const w = component[2];
      const h = component[3];
      const id = component[4];
      if ( x >= tx && x <= tx + w && y >= ty && y <= ty + h ) {
        return {isSelected: true, component: component};
      }
    }
    return {isSelected: false, component: null};
  }
  zoomed() {
    this.transform = d3.event.transform;
    this.render();
  }

  dragsubject() {
    const
      x = this.transform.invertX(d3.event.x),
      y = this.transform.invertY(d3.event.y);

      for (let i = this.components.length - 1; i >= 0; --i) {
        const point = this.components[i];
        const tx = point[0];
        const ty = point[1];
        const w = point[2];
        const h = point[3];
        const id = point[4];
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
    this.components.forEach((component) => {
      this.context.moveTo(component[0] + this.radius, component[1]);
      this.context.fillRect(component[0], component[1], component[2], component[3]);
    });
    this.context.fill();
    this.context.restore();
  }
}
