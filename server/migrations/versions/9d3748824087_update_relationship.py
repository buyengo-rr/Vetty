"""update relationship

Revision ID: 9d3748824087
Revises: 960db9625e7d
Create Date: 2025-07-30 17:42:36.019557
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d3748824087'
down_revision = '960db9625e7d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        # Just create the foreign key constraint with cascade delete
        batch_op.create_foreign_key(
            'fk_appointments_service_id_services',
            'services',
            ['service_id'],
            ['id'],
            ondelete='CASCADE'
        )


def downgrade():
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.drop_constraint('fk_appointments_service_id_services', type_='foreignkey')

    # ### end Alembic commands ###
