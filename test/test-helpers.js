const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      full_name: 'Test User 1',
      bio: 'This is the bio of Test User 1',
      img: 'https://picsum.photos/200',
      password: 'password',
      email: 'testemail1@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      username: 'test-user-2',
      full_name: 'Test User 2',
      bio: 'This is the bio of Test User 2',
      img: 'https://picsum.photos/200',
      password: 'password',
      email: 'testemail2@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      username: 'test-user-3',
      full_name: 'Test User 3',
      bio: 'This is the bio of Test User 3',
      password: 'password',
      img: 'https://picsum.photos/200',
      email: 'testemail3@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    }
  ]
}

function makePostsArray() {
  return [
    {
      id: 1,
      title: 'Blog post 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 1
    },
    {
      id: 2,
      title: 'Blog Post 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 1
    },
    {
      id: 3,
      title: 'Blog Post 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 2
    },
    {
      id: 4,
      title: 'Blog Post 4',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 2
    },
    {
      id: 5,
      title: 'Blog Post 5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 3
    },
    {
      id: 6,
      title: 'Blog Post 6',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: true,
      user_id: 3
    },
    {
      id: 7,
      title: 'Blog Post 7',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.',
      img: 'https://picsum.photos/300/200',
      date_created: new Date(),
      date_modified: new Date(),
      published: false,
      user_id: 3
    }
  ]
}

function makeCommentsArray() {
  return [
    {
      post_id: 6,
      id: 1, 
      content: 'Wow Such blog',
      date_created: new Date(),
      user_id: 1
    },
    {
      post_id: 6,
      id: 2,
      content: `This is hands down the best thing I have ever read -P.S. I can't read, my mom wrote this comment.`,
      date_created: new Date(),
      user_id: 2
    },
    {
      post_id: 5,
      id: 3,
      content: `Your other post was better.`,
      date_created: new Date(),
      user_id: 1
    },
    {
      post_id: 5,
      id: 4,
      content: `Don't listen to Jimbo, this one is good too.`,
      date_created: new Date(),
      user_id: 2
    },
    {
      post_id: 4,
      id: 5,
      content: `This is giberish`,
      date_created: new Date(),
      user_id: 3
    },
    {
      post_id: 4,
      id: 6,
      content: 'We should really start exploring some new languages, like pig latin.',
      date_created: new Date(),
      user_id: 1
    },
    {
      post_id:3,
      id: 7,
      content: 'I am the only person who has commented on this!! yay!!',
      date_created: new Date(),
      user_id: 3
    },
    {
      post_id: 2,
      id: 8,
      content: `Nobody commented on your first post so I decided I'd comment on this one`,
      date_created: new Date(),
      user_id: 2
    }
  ]
}

function makeBlogFixtures() {
  const testUsers = makeUsersArray()
  const testPosts = makePostsArray()
  const testComments = makeCommentsArray()
  return {testUsers, testPosts, testComments}
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ id: user.id}, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

function makeExpectedUser(user) {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    img: user.img,
    bio: user.bio,
    email: user.email,
    date_created: user.date_created,
    date_modified: user.date_modified
  }
}

function seedUsers(db, usrs) {
  const bcryptedUsers = usrs.map(u => ({
    ...u,
    password: bcrypt.hashSync(u.password, 12)
  }))
  return db.into('users').insert(bcryptedUsers)
    .then(() => 
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [usrs[usrs.length - 1].id]
      )
    )
}

function seedBlogTables(db, users, posts, comments=[]) {
  return seedUsers(db, users)
    .then(() => {
      return db
        .into('posts')
        .insert(posts)
        .then(() => 
          db.raw(
            `SELECT setval('posts_id_seq', ?)`,
            [posts[posts.length - 1].id]
          )
        )
    })
    .then(() => 
      comments.length && db.into('comments').insert(comments)
    )
}

function makeExpectedPost(users, post, comments=[]) {
  const user = users.find(user => user.id === post.user_id)

  const number_of_comments = comments
    .filter(comment => comment.post_id === post.id)
    .length

  return {
    id: post.id,
    img: post.img,
    title: post.title,
    content: post.content,
    date_created: post.date_created.toISOString(),
    date_modified: post.date_modified.toISOString(),
    number_of_comments,
    user: {
      id: user.id,
      username: user.username,
      img: user.img,
      bio: user.bio
    },
  }
}

function makeExpectedPostComments(users, posts, comments) {
  const expectedComments = comments
    .filter(comment => comment.post_id === postId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      content: comment.content,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        username: commentUser.username,
        img: commentUser.img
      }
    }
  })
}

function makeMaliciousPost(user) {
  const maliciousPost = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    img: '<img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">',
    date_created: new Date(),
    date_modified: new Date(),
    published: false,
    user_id: user.id
  }

  const expectPost = {
    ...makeExpectedPost([user], maliciousPost),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    img: '<img src="https://url.to.file.which/does-not.exist">'
  }

  return {
    maliciousPost,
    expectPost
  }
}

function seedMaliciousData(db, user, post, comments) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('posts')
        .insert([post])
    )
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      comments,
      posts,
      users
        RESTART IDENTITY CASCADE
    `
  )
}

module.exports = {
  makeUsersArray,
  makeBlogFixtures,
  seedUsers,
  makeAuthHeader,
  cleanTables,
  makeExpectedUser,
  makeMaliciousPost,
  makeExpectedPostComments,
  makeExpectedPost,
  seedBlogTables,
  seedMaliciousData
}