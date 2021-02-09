import { Injectable } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private title:Title) { }

  generateTags(tags:any){
    //default values
    tags = {
      title: 'Stadia Hunters | Stadia Achievements Tracking and Guides',
      description: 'Stadia Hunters is the community for Stadia achievements hunters. Find all the stadia achievements list for all the released games with achievements guides, secret achievements revealed, reporting bugged, seperating by dlc requirements and more. The best way on Stadia to view achievements and track them. Here you also find the best stadia leaderboard and stadia game stats with most users. Use the extension to get easiest solution on how to see stadia achievements on chrome and the Android app to view stadia achievements.',
      image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
      slug: '',
      ...tags  
    }

    //Set a title
    this.title.setTitle(tags.title)

    this.meta.updateTag({name:'twitter:card', content:'summary_large_image'})
    this.meta.updateTag({name:'twitter:site', content:'@stadiahunters'})
    this.meta.updateTag({name:'twitter:title', content: tags.title})
    this.meta.updateTag({name:'twitter:description', content:tags.description})
    this.meta.updateTag({name:'twitter:image', content: tags.image})

    this.meta.updateTag({name:'og:type', content: 'article'})
    this.meta.updateTag({name:'og:site_name', content:'StadiaHunters'})
    this.meta.updateTag({name:'og:title', content: tags.title})
    this.meta.updateTag({name:'og:descriptiom', content: tags.description})
    this.meta.updateTag({name:'og:image', content: tags.image})
  }
}
