# ISQLiteDatabase

{% tabs %}
{% tab title="ISQLiteDatabase" %}
```java
/**
 * Interface to be implemented by classes that provide a connection to a SQLite database.
 */
public interface ISQLiteDatabase {

    void beginTransaction();

    void endTransaction();

    void execSQL(String sql, Object[] bindArgs) throws SymphonySQLException;

    Cursor query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy);

    Cursor rawQuery(String sql, String[] selectionArgs);

    long insert(String table, String nullColumnHack, ContentValues values);

    long insertWithOnConflictReplace(String table, String nullColumnHack, ContentValues initialValues);

    long insertWithOnConflictIgnore(String table, String nullColumnHack, ContentValues initialValues);

    int delete(String table, String whereClause, String[] whereArgs);

    void setTransactionSuccessful();

    int update(String table, ContentValues values, String whereClause, String[] whereArgs);

    long insertOrThrow(String table, String nullColumnHack, ContentValues values) throws SymphonySQLException;

    void execSQL(String sql) throws SymphonySQLException;

    void close();

    boolean isOpen();
}
```
{% endtab %}
{% endtabs %}
