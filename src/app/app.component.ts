import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TreeComponent, TreeNode} from './components/tree/tree.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit{
  public treeNodes: TreeNode[] = [
    {
      "id": 1,
      "title": "Значение 1",
      "is_deleted": false,
      "children": [
        {
          "id": 2,
          "title": "Значение 1.1",
          "is_deleted": false,
          "children": [
            {
              "id": 3,
              "title": "Значение 1.1.1",
              "is_deleted": true,
              "children": []
            }
          ]
        },
        {
          "id": 4,
          "title": "Значение 1.2",
          "is_deleted": false,
          "children": [
            {
              "id": 5,
              "title": "Значение 1.2.1",
              "is_deleted": false,
              "children": []
            },
            {
              "id": 6,
              "title": "Значение 1.2.2",
              "is_deleted": false,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": 7,
      "title": "Значение 2",
      "is_deleted": false,
      "children": [
        {
          "id": 8,
          "title": "Значение 2.1",
          "is_deleted": true,
          "children": [
            {
              "id": 9,
              "title": "Значение 2.1.1",
              "is_deleted": true,
              "children": [
                {
                  "id": 10,
                  "title": "Значение 2.1.1.1",
                  "is_deleted": true,
                  "children": [
                    {
                      "id": 11,
                      "title": "Значение 2.1.1.1.1",
                      "is_deleted": true,
                      "children": [
                        {
                          "id": 12,
                          "title": "Значение 2.1.1.1.1.1",
                          "is_deleted": false,
                          "deleted_at": null,
                          "children": [
                            {
                              "id": 13,
                              "title": "Значение 2.1.1.1.1.1.1",
                              "is_deleted": false,
                              "children": []
                            }
                          ]
                        },
                        {
                          "id": 13,
                          "title": "Значение 2.1.1.1.1.2",
                          "is_deleted": false,
                          "children": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
      ]
    }
  ]
  private initSignals(nodes: TreeNode[]): void {
    for (const node of nodes) {
      if (!node.isOpen) {
        node.isOpen = signal(false);
      }
      if (node.children?.length) {
        this.initSignals(node.children);
      }
    }
  }
  public ngOnInit(): void {
    this.initSignals(this.treeNodes);
  }
}
