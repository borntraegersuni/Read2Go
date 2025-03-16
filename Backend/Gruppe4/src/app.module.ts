import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { CommentService } from './comment/comment.service';
import { ReviewModule } from './review/review.module';
import { ReviewService } from './review/review.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import * as argon2 from 'argon2';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    UserModule,
    BookModule,
    CommentModule,
    ReviewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
    private readonly reviewService: ReviewService,
    private readonly commentService: CommentService,
  ) {}

  async onModuleInit() {


    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database
    //await this.userService.delete(3)
    // const user = new User();
    // user.username = 'm-m';
    // user.email = 'm@m.de';
    // user.passwordHash = await argon2.hash("password"); // "password"

   // const { id: userId } = await this.userService.create(user);
    // const { id: bookId } = await this.bookService.addBook({
    //   title: 'Harry Potter and the Chamber of Secrets',
    //   author: 'J. K. Rowling',
    //   publishedYear: 1997,
    //   isbn: '978-0-7475-3269-9',
    //   genre: 'Fantasy',
    //   coverImageUrl: 'https://m.media-amazon.com/images/I/81DI+BAN2SL._AC_UF1000,1000_QL80_.jpeg', 
    // });
    
    // Add book with id 4 to user with id 1
    //await this.userService.addBookToUser(1, 8, 'wishlist');
    // await this.userService.addBookToUser(userId, bookId, 'wishlist');
    // const { id: reviewId } = await this.reviewService.addReview(
    //   userId,
    //   bookId,
    //   2,
    //   'content review',
    // );
    // await this.reviewService.addLike(reviewId, userId);
    // const { id: commentId } = await this.commentService.addComment(
    //   userId,
    //   'ok',
    // );
    // await this.commentService.addLike(commentId, userId);

    // const userRead = await this.userService.readOne(userId);
    // console.log(inspect(userRead, true, 10, true));

    // const bookRead = await this.bookService.getBookById(bookId);
    // console.log(inspect(bookRead, true, 10, true));

    // const commentRead =
    //   await this.commentService.getCommentsForReview(reviewId);
    // console.log(inspect(commentRead, true, 10, true));

    // const reviewRead = await this.reviewService.getReview(reviewId);
    // console.log(inspect(reviewRead, true, 10, true));


    // await Promise.all([
    //   this.bookService.addBook({
    //     title: 'Throne of Glass',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2012,
    //     isbn: '9781639730957',
    //     genre: 'Fantasy',
    //     description: 'In Throne of Glass, the first book of Sarah J. Maas\'s bestselling series, assassin Celaena Sardothien is summoned to the castle to compete for her freedom by defeating twenty-three other deadly contenders. As she navigates challenges from the Crown Prince and the Captain of the Guard, she must also confront a dark force that threatens her life and the kingdom. This thrilling tale combines elements of adventure, friendship, and survival in a captivating fantasy world.',
    //     coverImageUrl: './tog1.jpeg'
    //   }),

    //   this.bookService.addBook({
    //     title: 'Crown of Midnight',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2013,
    //     isbn: '9781639730971',
    //     genre: 'Fantasy',
    //     description: 'In the second book of the Throne of Glass series by Sarah J. Maas, Celaena Sardothien, now the King\'s Champion, struggles with her loyalty to the crown while secretly seeking justice. As she uncovers hidden truths, those around her, including Crown Prince Dorian, Captain Chaol, and her friend Nehemia, are drawn into a web of suspicion. A tragic event forces Celaena to confront her true loyalties and decide what she is willing to fight for in a land plagued by deception.',
    //     coverImageUrl: './tog2.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Heir of Fire',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2014,
    //     isbn: '9781639730995',
    //     genre: 'Fantasy',
    //     description: 'In the third book of the Throne of Glass series by Sarah J. Maas, Celaena Sardothien must journey to a new land to confront a life-altering truth about herself. As monstrous forces threaten to enslave her world, she must find the strength to battle both external evils and her inner demons. This installment continues her transformation from woman to warrior, as she seeks the courage to embrace her destiny and shine brighter than ever.',
    //     coverImageUrl: './tog3.jpeg',
    //   }),

      // this.bookService.addBook({
      //   title: 'Queen of Shadows',
      //   author: 'Sarah J. Maas',
      //   publishedYear: 2015,
      //   isbn: '9781639731015',
      //   genre: 'Fantasy',
      //   description: 'In the fourth book of the #1 bestselling Throne of Glass series by Sarah J. Maas, Celaena Sardothien fully embraces her identity as Aelin Galathynius, Queen of Terrasen. To reclaim her throne, Aelin must fight for her cousin, her imprisoned friend, and her enslaved people. With everything she loves at risk, Aelin\'s heart beats for vengeance, and no one will escape the queen\'s wrath.',
      //   coverImageUrl: './tog4.jpeg',
      // }),

    //   this.bookService.addBook({
    //     title: 'Empire of Storms',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2016,
    //     isbn: '9781639731039',
    //     genre: 'Fantasy',
    //     description: 'In the fifth book of the Throne of Glass series by Sarah J. Maas, Aelin Galathynius faces the brewing war as she begins her ascent to the throne. With loyalties tested and magic users clashing with non-magic folk, Aelin must harness her immense power to protect her loved ones. As dark forces threaten her world, she embarks on a perilous quest that demands the ultimate sacrifice, forcing her to decide what—and who—she is willing to give up for peace.',
    //     coverImageUrl: './tog5.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Tower of Dawn',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2017,
    //     isbn: '9781639731053',
    //     genre: 'Fantasy',
    //     description: 'In the sixth book of the Throne of Glass series by Sarah J. Maas, Chaol Westfall and Nesryn Faliq travel to Antica to secure an alliance with the Khagan of the Southern Continent, hoping to gain the support of his vast armies. While seeking healing for Chaol\'s injuries at Torre Cesme, they encounter Yrene Towers, who reluctantly agrees to help despite her past traumas caused by Adarlanian soldiers. As they navigate the political intricacies of the khaganate, they uncover ancient secrets in the mountains that could either save their world or lead to its destruction, all while the final battle looms on the horizon.',
    //     coverImageUrl: './tog6.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Kingdom of Ash',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2018,
    //     isbn: '9781639731077',
    //     genre: 'Fantasy',
    //     description: 'In the epic finale of the Throne of Glass series by Sarah J. Maas, Aelin Galathynius is imprisoned and tortured by the Queen of the Fae, yet she clings to her resolve to save her people at any cost. As her friends and allies are scattered, they must navigate deepening bonds and irreparable losses. With destinies converging, they must unite to stand a chance against the looming threat and fight for Erilea\'s salvation. This explosive conclusion sees Aelin battling for her life, her people, and the hope of a brighter future.',
    //     coverImageUrl: './tog7.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'A Court of Thorns and Roses',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2015,
    //     isbn: '9781619634442',
    //     genre: 'Fantasy',
    //     description: 'In the first book of the A Court of Thorns and Roses series by Sarah J. Maas, nineteen-year-old huntress Feyre kills a wolf, only to be taken to a magical faerie land as retribution. There, she discovers her captor, Tamlin, is not always the beast he appears to be. As Feyre\'s feelings for Tamlin evolve, she uncovers a growing ancient threat in the faerie lands. To save Tamlin and his world, she must confront this dark force. This seductive and action-packed novel offers a dark retelling of Beauty and the Beast, blending romance, adventure, and faerie lore.',
    //     coverImageUrl: './acotar1.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'A Court of Mist and Fury',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2016,
    //     isbn: '9781619635197',
    //     genre: 'Fantasy',
    //     description: 'In the second book of the A Court of Thorns and Roses series by Sarah J. Maas, Feyre, still recovering from her traumatic experiences, finds herself drawn to Rhysand, the High Lord of the Night Court. As she grapples with her new powers and the impending marriage to Tamlin, she is haunted by nightmares and a sense of emptiness. Torn between her obligations to Rhysand and her life in the Spring Court, Feyre must navigate a complex web of politics and passion while confronting a looming evil. This sequel masterfully blends romance, action, and the struggle for identity, as Feyre discovers her potential to shape her future and that of a world in turmoil.',
    //     coverImageUrl: './acotar2.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'A Court of Wings and Ruin',
    //     author: 'Sarah J. Maas',
    //     publishedYear: 2017,
    //     isbn: '9781619634480',
    //     genre: 'Fantasy',
    //     description: 'In the third book of the A Court of Thorns and Roses series by Sarah J. Maas, Feyre returns to the Spring Court to spy on Tamlin and gather information about an invading king. As she navigates this dangerous deception, one mistake could doom everything she holds dear. With war looming, Feyre must master her powers and political acumen, while she and Rhysand seek trustworthy allies among the High Lords. This thrilling installment raises the stakes as armies vie for control over a power that could destroy their world.',
    //     coverImageUrl: './acotar3.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Fourth Wing',
    //     author: 'Rebecca Yarros',
    //     publishedYear: 2023,
    //     isbn: '9781649377371',
    //     genre: 'Fantasy',
    //     description: 'Fourth Wing by Rebecca Yarros introduces readers to the brutal and elite world of a war college for dragon riders. Twenty-year-old Violet Sorrengail, originally destined for the Scribe Quadrant, is thrust into the dangerous Riders Quadrant by her commanding general mother. With her frail body and the constant threat of death, Violet must use her wits to survive among ruthless candidates, including the powerful wingleader Xaden Riorson. As the war outside intensifies and secrets within the college emerge, Violet faces the ultimate test: graduate or perish.',
    //     coverImageUrl: './fourthwing.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Iron Flame',
    //     author: 'Rebecca Yarros',
    //     publishedYear: 2024,
    //     isbn: '9781649374172',
    //     genre: 'Fantasy',
    //     description: 'In Iron Flame, the electrifying sequel to Fourth Wing by Rebecca Yarros, Violet Sorrengail faces even greater challenges in her second year at Basgiath War College for dragon riders. Having survived the deadly Threshing, Violet now endures grueling training under a new vice commandant determined to break her spirit unless she betrays her beloved. Despite her frail body, Violet\'s sharp mind and unyielding will drive her to defy expectations and the brutal rules of the college. As she uncovers a centuries-old secret, Violet realizes that survival alone may not be enough to save her and her world. This installment continues the addictive fantasy adventure, emphasizing resilience and the power of making one\'s own rules.',
    //     coverImageUrl: './ironflame.jpeg',
    //   }),

    //   this.bookService.addBook({
    //     title: 'Onyx Storm',
    //     author: 'Rebecca Yarros',
    //     publishedYear: 2025,
    //     isbn: '9781649377159',
    //     genre: 'Fantasy',
    //     description: 'In Onyx Storm, the third installment of Rebecca Yarros\' Empyrean series, Violet Sorrengail faces the ultimate test as the battle intensifies at Basgiath War College. With trust in short supply and enemies both outside and within, Violet must venture beyond the crumbling Aretian wards to seek new allies for Navarre. Her journey demands every ounce of her wit, strength, and determination to protect her dragons, family, and home. As she grapples with a secret that could unravel everything, Violet knows they need an army, power, magic, and most importantly, the truth she alone can uncover. With a storm on the horizon, not everyone will survive its fury, making this a razor-sharp, thrilling continuation of the series.',
    //     coverImageUrl: './onyxstorm.jpeg',
//     //   })
//     this.bookService.addBook({
//       title: 'The Housemaid',
//       author: 'Freida McFadden',
//       publishedYear: 2022,
//       isbn: '9781538742570',
//       genre: 'Thriller',
//       description: 'The Housemaid by Freida McFadden is a gripping psychological thriller that has sold over 2 million copies and is set to become a major motion picture starring Sydney Sweeney and Amanda Seyfried. The story follows a housemaid who becomes entangled in the lives of the wealthy Winchester family, uncovering dark secrets and dangerous desires as she navigates her own hidden identity. With its jaw-dropping twists, this bestseller is a must-read for fans of suspenseful fiction.',
//       coverImageUrl: './housemaid.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Tell Me What You Did: A Novel',
//       author: 'Carter Wilson',
//       publishedYear: 2025,
//       isbn: '9781464226229',
//       genre: 'Thriller',
//       description: 'In The Confession, Poe Webb hosts a popular true crime podcast where people anonymously confess their crimes, offering them a mix of anonymity and instant fame. However, her world is turned upside down when a mysterious man claims to be her mother\'s murderer, forcing Poe to confront a dark secret\: she knows that her mother\'s killer is actually dead—because she killed him herself. As the truth unravels, the stakes rise, and Poe must navigate the dangerous intersection of confession and consequence.',
//       coverImageUrl: './tellmewhatyoudid.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Atomic Habits',
//       author: 'James Clear',
//       publishedYear: 2018,
//       isbn: '9780735211292',
//       genre: 'Nonfiction',
//       description: 'Atomic Habits by James Clear is a \#1 New York Times bestseller with over 20 million copies sold, offering a proven framework for improving habits and achieving remarkable results. Clear emphasizes that success is not about willpower but about creating effective systems, providing practical strategies to form good habits and break bad ones. With insights from various fields and inspiring true stories, this book equips readers with the tools to transform their habits and reach their goals.',
//       coverImageUrl: './atomichabits.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'The Diary of Anne Frank',
//       author: 'Anne Frank',
//       publishedYear: 2003,
//       isbn: '9780141315195',
//       genre: 'Nonfiction',
//       description: 'This edition reprints the version authorized by the Frank estate, and includes a new Introduction, a Bibliography, and a chronology of Anne Frank\'s life and times.',
//       coverImageUrl: './annefrank.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Funny Story',
//       author: 'Emily Henry',
//       publishedYear: 2025,
//       isbn: '9780593441213',
//       genre: 'Romace',
//       description: 'Happy Place by Emily Henry follows Daphne, who finds herself starting anew in Waning Bay, Michigan, after her fiancé falls for his childhood best friend. Stranded without friends or family, she becomes roommates with Miles Nowak, Petra\'s ex, and together they navigate their contrasting personalities while forming a tentative friendship. As they post misleading photos of their summer adventures, they must confront the unexpected possibility of love amidst their complicated pasts.',
//       coverImageUrl: './funnystory.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Blue Sisters',
//       author: 'Coco Mellors',
//       publishedYear: 2025,
//       isbn: '9780008623036',
//       genre: 'Fiction',
//       description: 'The Blue Sisters follows the lives of three very different sisters Avery Bonnie and Lucky who are brought together by the unexpected death of their beloved fourth sister Nicky. As they reunite in New York to confront the sale of their childhood home they must navigate their individual struggles with grief addiction and heartbreak. Through their journey the sisters learn to reconnect with one another and rediscover their love for life amidst the challenges they face.',
//       coverImageUrl: './bluesisters.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Yellowface',
//       author: 'R. F. Kuang',
//       publishedYear: 2023,
//       isbn: '9780063323179',
//       genre: 'Fiction',
//       description: 'Yellowface tells the story of June Hayward who steals the manuscript of her deceased friend Athena Liu after witnessing her death. As June rebrands herself as Juniper Song and claims Athena\'s work as her own she grapples with the consequences of her actions amid questions of diversity and cultural appropriation. With a gripping narrative and dark humor R.F. Kuang explores the lengths to which one will go to protect their success and identity.',
//       coverImageUrl: './yellowface.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'Just Kids',
//       author: 'Patti Smith',
//       publishedYear: 2010,
//       isbn: '9780747568766',
//       genre: 'Poetry',
//       description: 'Just kids is memoir about Patti Smith and her extraordinary relationship with artist Robert Mapplethorpe. Set against the vibrant backdrop of New York City in the late 1960s and 1970s the book chronicles their romance and lifelong friendship as they navigate the art and music scenes alongside iconic figures of the time. Beautifully written this memoir serves as both a love story and an elegy capturing the struggles and triumphs of two young artists dedicated to their craft.',
//       coverImageUrl: './justkids.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'The Love Hypothesis',
//       author: 'Ali Hazelwood',
//       publishedYear: 2021,
//       isbn: '9781408725764',
//       genre: 'Romance',
//       description: 'The Love Hypothesis is a contemporary romance that follows Olive Smith a third-year Ph.D. candidate who does not believe in lasting romantic relationships but finds herself in a fake relationship with her colleague Adam Carlsen. When Olive kisses Adam to convince her best friend that she is on her way to a happily ever after he surprisingly agrees to be her fake boyfriend which leads to unexpected chemistry and challenges. As their charade unfolds Olive realizes that understanding love is far more complicated than any scientific hypothesis.',
//       coverImageUrl: './lovehypothesis.jpeg',
//     }),

// this.bookService.addBook({
//       title: 'The American Roommate Experiment',
//       author: 'Elena Armas',
//       publishedYear: 2022,
//       isbn: '9781398515642',
//       genre: 'Romance',
//       description: 'The American Roommate Experiment is a delightful rom-com by Elena Armas that follows Rosie Graham who has just quit her job to pursue her secret career as a romance writer but faces writer\'s block and a crumbling apartment ceiling. When she unexpectedly ends up sharing an apartment with Lucas Martín the man she has been secretly crushing on he proposes a series of experimental dates to inspire her writing. As they navigate their forced proximity and growing attraction Rosie must confront her feelings before Lucas\'s time in New York runs out.',
//       coverImageUrl: './amaricanroommate.jpeg',
//     })

//     ]);
    
//     console.log('All books have been added to the database.');



    // Add books with IDs 9-21 to user 1's reading list
// await Promise.all([
//   this.userService.addBookToUser(1, 61, 'reading'),
//   this.userService.addBookToUser(1, 62, 'reading'),
//   this.userService.addBookToUser(1, 63, 'reading'),
//   this.userService.addBookToUser(1, 64, 'reading'),
//   this.userService.addBookToUser(1, 65, 'reading'),
//   this.userService.addBookToUser(1, 66, 'reading'),
//   this.userService.addBookToUser(1, 67, 'reading'),
//   this.userService.addBookToUser(1, 68, 'reading'),
//   this.userService.addBookToUser(1, 69, 'reading'),
//   this.userService.addBookToUser(1, 70, 'reading'),
//   this.userService.addBookToUser(1, 71, 'reading'),
//   this.userService.addBookToUser(1, 72, 'reading'),
//   this.userService.addBookToUser(1, 73, 'reading'),
// ]);

// console.log('All books have been added to user 1\'s reading list.');

// //Delete books
// for (let id = 84; id <= 93; id++) {
//   try {
//     await this.bookService.deleteBook(id);
//     console.log(`Successfully deleted book with ID ${id}`);
//   } catch (error) {
//     console.error(`Failed to delete book with ID ${id}:`, error.message);
//   }
// }

// console.log('Book deletion completed.');
}

}
