BEGIN;

TRUNCATE
  comments,
  posts,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users(username, full_name, email, bio, img, password)
VALUES 
  ('user 1', 'Joe Bob', 'user1@email.com', 'Hi my name is Joe Bob and this is my bio!', 'https://picsum.photos/200', '$2a$12$eBLxwDZXNP1EaMXtYN3DZehkqXc.CQpw7OxQxS0qJXc7QtYj8FQqi'),
  ('user 2', 'Dude Guy', 'user2@email.com', 'Hi my name is Dude Guy and this is my bio!', 'https://picsum.photos/200', '$2a$12$eBLxwDZXNP1EaMXtYN3DZehkqXc.CQpw7OxQxS0qJXc7QtYj8FQqi'),
  ('user 3', 'John Doe', 'user3@email.com', 'Hi my name is John Doe and this is my bio!', 'https://picsum.photos/200', '$2a$12$eBLxwDZXNP1EaMXtYN3DZehkqXc.CQpw7OxQxS0qJXc7QtYj8FQqi');

INSERT INTO posts(title, img, user_id, content, published)
VALUES 
  ('Blog Post 1', 'https://picsum.photos/300/200', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', true),
  ('Blog Post 2', 'https://picsum.photos/300/200', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', true),
  ('Blog Post 3', 'https://picsum.photos/300/200', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', true),
  ('Blog Post 4', 'https://picsum.photos/300/200', 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', true),
  ('Blog Post 5', 'https://picsum.photos/300/200', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', true),
  ('Blog Post 6', 'https://picsum.photos/300/200', 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut vulputate magna. Quisque et accumsan metus. Etiam volutpat magna pharetra placerat mollis. Pellentesque lobortis ac nisl eu pharetra. Nulla cursus libero non efficitur consequat. Curabitur et purus risus. Duis sit amet congue enim. Aenean porta neque ac sem vehicula ultricies. Phasellus malesuada sem id sodales commodo. Quisque mollis, purus at dignissim efficitur, urna sapien tempus enim, et pretium dui libero et nisl. Proin eros erat, cursus a mollis vel, hendrerit non lectus. Sed cursus risus ex, et laoreet enim euismod et.Nunc lacinia tincidunt enim et laoreet. Pellentesque sit amet maximus urna. Cras dapibus tortor ac tellus pulvinar pretium. Nunc bibendum gravida sodales. Nunc ut aliquet metus. Maecenas bibendum, enim eget facilisis sodales, nulla ex faucibus orci, nec lacinia tellus lacus et sapien. Fusce et ligula augue. Vestibulum id feugiat metus. Aenean lacinia ipsum sed dignissim ultrices. In pharetra enim a enim ultricies vehicula. Suspendisse dapibus pretium lorem. Quisque tempor metus urna, a posuere dolor egestas eget. In dignissim, nisi vel dignissim fringilla, mauris nisi rutrum eros, vitae scelerisque erat diam sit amet ipsum. Ut id venenatis massa. Vestibulum a nulla mauris. Donec luctus sem feugiat arcu gravida aliquam. Etiam vulputate convallis placerat. Suspendisse egestas ullamcorper ante sed feugiat. Nulla sed dictum nulla. In facilisis purus ut ultricies consequat. Nunc interdum felis sit amet cursus scelerisque. Maecenas finibus placerat finibus. Proin tristique quam et mauris accumsan pulvinar. In fringilla id justo at laoreet. Nunc imperdiet malesuada volutpat. Sed commodo, velit sit amet ultrices condimentum, dui risus ullamcorper mauris, posuere rutrum neque nisi a velit. Nullam in mattis ligula, a vehicula ante. Phasellus eu nulla id nulla viverra porta. Vestibulum et odio in sapien laoreet feugiat. Aenean euismod, est a porta suscipit, turpis sapien mattis turpis, at fringilla est leo eu tellus. Integer non sollicitudin mauris. Integer vel augue et purus consectetur ultricies eget eget justo. Sed efficitur elit sed ultrices interdum. Nulla tempor pulvinar mi, et pellentesque augue rutrum sit amet. Aliquam aliquet, magna ac aliquet interdum, nisi ligula varius lectus, sodales viverra ex nisl id felis. In eu dolor sagittis eros ullamcorper fermentum. Cras laoreet sem purus, nec dignissim lacus tristique sit amet. Nunc at velit congue, efficitur leo vel, malesuada eros. Suspendisse sed imperdiet justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Sed semper nunc sem, ut fringilla dui posuere vitae. Duis dignissim varius turpis, vel ultrices lorem luctus eget. Cras dictum sodales metus, at ullamcorper felis maximus non. Morbi et felis ut tortor tempus vehicula vitae ac quam. Nulla consectetur leo at odio volutpat ornare. Ut sagittis hendrerit tristique. Mauris fringilla dignissim vulputate. Integer elementum fermentum sem ac aliquam. Vivamus eu ante vel dui accumsan rhoncus ac iaculis dui. Donec vitae nisi tempor, efficitur lorem mollis, molestie neque. Etiam bibendum suscipit velit, vitae vehicula lacus. In at blandit magna. Mauris tincidunt mauris a odio iaculis interdum. Quisque commodo ac tellus sit amet lacinia. Nullam urna ligula, auctor quis cursus et, commodo quis dolor. Vivamus ac placerat augue. Proin sit amet mattis lorem. Phasellus consectetur tellus vel lorem convallis, nec posuere nunc pellentesque. In pulvinar ullamcorper arcu nec vehicula. Suspendisse finibus dolor ipsum, nec imperdiet urna scelerisque a. Quisque in libero ac ligula maximus malesuada sed et lorem. Nam eleifend in erat finibus aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et volutpat erat. Sed sed pulvinar ex. Nulla facilisi. Aliquam ac enim vitae metus venenatis scelerisque. Sed at gravida enim, in porta dolor. Nullam convallis vel mi euismod consectetur. Nunc eu sapien a tortor feugiat semper. Vivamus consequat leo vel urna rutrum egestas. Suspendisse potenti. Proin cursus imperdiet metus, sed ultrices dolor aliquam quis. Quisque condimentum, metus eu cursus eleifend, orci felis tincidunt lorem, eget pellentesque justo dui vitae enim. Ut consequat est sed egestas tristique. Nulla convallis velit nec felis volutpat ultricies. Fusce a euismod magna, suscipit tempus ex. Quisque elementum velit ut velit tristique sagittis. Nulla dictum est in neque placerat, finibus ornare eros rutrum. Aenean eu lacus sit amet nisl varius cursus pretium nec magna. Cras sagittis maximus lobortis. Morbi laoreet leo at bibendum viverra. Maecenas tempus neque eu blandit finibus. Aenean ultricies imperdiet lorem non tempus. Pellentesque consequat blandit urna vitae blandit. Cras malesuada massa sit amet mi scelerisque, ut lacinia arcu rutrum. Vestibulum commodo mauris turpis, vel ornare turpis tristique non. Mauris semper lectus at pellentesque efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In turpis mi, efficitur non malesuada vitae, bibendum vel lectus. Aenean egestas ligula sed purus convallis hendrerit. Donec vehicula sapien sit amet gravida dictum. Etiam facilisis rhoncus ultrices. Praesent sed aliquet nunc. Fusce nibh nisl, malesuada non condimentum ut, iaculis in dui. Etiam ac imperdiet neque, a posuere ex. Donec porta justo sit amet consectetur iaculis. Maecenas imperdiet purus sed imperdiet tristique. Vivamus varius dictum orci luctus malesuada. In sit amet tempus massa. Curabitur auctor aliquet volutpat. Pellentesque non convallis justo. Nam vitae tristique lacus. Morbi blandit ante et suscipit hendrerit. Cras ut nisl vehicula, ullamcorper ex lobortis, varius erat. Etiam laoreet vehicula mi, quis lacinia sapien molestie eget. Duis ac viverra dui, blandit iaculis eros. Duis finibus mi at tempor faucibus. Nullam tortor augue, vestibulum nec risus id, auctor placerat eros. Integer sollicitudin accumsan urna.', false);

INSERT INTO comments(user_id, post_id, content)
VALUES 
  (2, 1, 'Wow such blog'),
  (3, 1, 'MUCH WELL WRITTEN WOW!'),
  (2, 2, 'You write post good'),
  (3, 2, 'This also read like good'),
  (1, 3, 'Wow even this such blog'),
  (3, 3, 'If I had a nickel I would have 5 cents'),
  (2, 4, 'I comment on my own post yay'),
  (1, 4, 'how u comment on own post?'),
  (1, 5, 'I only comment on this no one else');

COMMIT;