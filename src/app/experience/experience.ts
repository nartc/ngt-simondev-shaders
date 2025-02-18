import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { extend } from 'angular-three';
import { NgtsOrthographicCamera } from 'angular-three-soba/cameras';
import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';

import fragmentShader from './shaders/fragment.glsl' with { loader: 'text' };
import vertexShader from './shaders/vertex.glsl' with { loader: 'text' };

@Component({
  selector: 'app-experience',
  template: `
    <ngts-orthographic-camera
      [options]="{
        makeDefault: true,
        manual: true,
        position: [0, 0, 1],
        left: 0,
        right: 1,
        top: 1,
        bottom: 0,
        near: 0.1,
        far: 1000,
      }"
    />

    <ngt-mesh #mesh [position]="[0.5, 0.5, 0]">
      <ngt-plane-geometry />
      <ngt-shader-material [uniforms]="uniforms" [vertexShader]="vertexShader" [fragmentShader]="fragmentShader" />
    </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgtsOrthographicCamera],
})
export class Experience {
  protected readonly vertexShader = vertexShader;
  protected readonly fragmentShader = fragmentShader;
  protected uniforms = {};

  constructor() {
    extend({ Mesh, PlaneGeometry, ShaderMaterial });
  }
}
