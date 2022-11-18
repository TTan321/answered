from app.models import db, Tag

def seed_tags():
    tag1 = Tag(
        name = 'Food',
        image_url = 'https://cdn-icons-png.flaticon.com/512/857/857718.png'
    )
    tag2 = Tag(
        name = 'Movies',
        image_url = 'https://cdn-icons-png.flaticon.com/512/3172/3172555.png'
    )
    tag3 = Tag(
        name = 'Health',
        image_url = 'https://cdn-icons-png.flaticon.com/512/1962/1962578.png'
    )
    tag4 = Tag(
        name = 'Finance',
        image_url = 'https://cdn-icons-png.flaticon.com/512/545/545885.png'
    )
    tag5 = Tag(
        name = 'Sports',
        image_url = 'https://cdn-icons-png.flaticon.com/512/857/857455.png'
    )

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
