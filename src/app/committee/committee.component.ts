import { Component, OnInit } from '@angular/core';

import { Group } from '../models/group.model';
import { User } from '../models/user.model';

import { GroupManagerService } from '../group-manager/group-manager.service';

@Component({
  selector: 'prism-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.css']
})
export class CommitteeComponent implements OnInit {
  prs: any[] = [];
  currentUser: User = new User();
  isAdmin: boolean;

  constructor(private groupManagerService: GroupManagerService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(JSON.stringify(this.currentUser.groups));

    this.isAdmin = this.currentUser.groups.some( x => x.name === 'Administrators');

    this.groupManagerService.getPrs().subscribe( data => {
      const members = data.members;
      this.prs = members.sort(this.compareUsernames);
    })
  }

  /* Function to sort group by username in alphabetical order */
  compareUsernames(user1, user2) {
    const username1 = user1.username.toLowerCase();
    const username2 = user2.username.toLowerCase();

    if (username1 > username2) {
      return 1;
    } else if (username1 < username2) {
      return -1;
    }
    return 0;
  }
}
