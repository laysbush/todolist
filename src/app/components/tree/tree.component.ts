import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgStyle} from '@angular/common';

export interface TreeNode {
  id: number;
  title: string;
  is_deleted: boolean;
  children?: TreeNode[];
  isOpen?: WritableSignal<boolean>;
  deleted_at?: null;
}

@Component({
  selector: 'app-tree-component',
  imports: [RouterOutlet, TreeComponent, NgStyle],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  standalone: true
})
export class TreeComponent {
  @Input() treeNodes!: TreeNode[];

  public updateTree(node: TreeNode): void {
      node.isOpen?.set(!node.isOpen());
  }

  public idAlert(id: number): void {
    console.log('Ветка с id= ', id)
  }
}
