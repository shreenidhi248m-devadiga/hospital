import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = 'Search records...',
  pageSize = 8,
  onRowClick,
  emptyMessage = 'No matching records found',
}) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);

  const filteredData = useMemo(() => {
    let result = [...data];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const val = row[col.key];
          return val && String(val).toLowerCase().includes(s);
        })
      );
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey] || '';
        const bVal = b[sortKey] || '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const pagedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '16px' }}>
      
      {/* Search Header Container inside Card */}
      {searchable && (
        <div style={{
          padding: '16px 24px', backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'
        }}>
          <div style={{ position: 'relative', maxWidth: '340px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              placeholder={searchPlaceholder}
              style={{
                width: '100%', padding: '9px 14px 9px 36px', fontSize: '13px',
                backgroundColor: 'white', border: '1px solid #CBD5E1', borderRadius: '10px',
                outline: 'none', transition: 'all 0.15s', color: '#0F172A'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563EB'}
              onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
            />
          </div>
        </div>
      )}

      {/* Table Area */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', fontSize: '13px', textAlign: 'left', borderCollapse: 'collapse', borderSpacing: 0 }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: '#475569',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.5',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none',
                    verticalAlign: 'middle'
                  }}
                  className={col.className || ''}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minHeight: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', letterSpacing: '0.06em' }}>{col.label}</span>
                    {sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp style={{ width: '14px', height: '14px', color: '#2563EB' }} /> : <ChevronDown style={{ width: '14px', height: '14px', color: '#2563EB' }} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '48px 24px', textAlign: 'center', color: '#94A3B8', fontWeight: 500 }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pagedData.map((row, i) => (
                <tr
                  key={row.id || i}
                  onClick={() => onRowClick?.(row)}
                  style={{
                    borderBottom: i < pagedData.length - 1 ? '1px solid #F1F5F9' : 'none',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '16px 24px', color: '#1E293B', fontWeight: 500, verticalAlign: 'middle' }} className={col.className || ''}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div style={{
          padding: '16px 24px', borderTop: '1px solid #F1F5F9',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#64748B', fontWeight: 500,
          backgroundColor: '#F8FAFC', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px'
        }}>
          <span>
            Showing {filteredData.length > 0 ? page * pageSize + 1 : 0} - {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length} entries
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              style={{
                padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1',
                backgroundColor: 'white', cursor: page === 0 ? 'not-allowed' : 'pointer',
                opacity: page === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronLeft style={{ width: '16px', height: '16px', color: '#475569' }} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  minWidth: '32px', height: '32px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                  border: page === i ? 'none' : '1px solid #E2E8F0',
                  backgroundColor: page === i ? '#2563EB' : 'white',
                  color: page === i ? 'white' : '#475569', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              style={{
                padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1',
                backgroundColor: 'white', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                opacity: page === totalPages - 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <ChevronRight style={{ width: '16px', height: '16px', color: '#475569' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
